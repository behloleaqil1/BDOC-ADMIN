import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NavigationService} from "../../../../../core/navigation/navigation.service";
import {FuseNavigationItem} from "../../../../../../@fuse/components/navigation";
import {flatMapDeep} from "lodash";
import {FuseAlertService} from "../../../../../../@fuse/components/alert";

@Component({
    selector: 'app-create-edit',
    templateUrl: './create-edit.component.html',
    styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {

    formGroup: FormGroup;
    parentNavigation: FuseNavigationItem[]
    childrenIds = [];
    parent: FuseNavigationItem;
    flatNavigation: FuseNavigationItem[] = []
    errors: any = [];

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private navigationService: NavigationService,
        public dialogRef: MatDialogRef<CreateEditComponent>,
        private fuseAlert: FuseAlertService
    ) {
    }

    ngOnInit(): void {
        this.getNavigation()
        this.flattenMenu(this.parentNavigation);

        if (this.data) {
            this.getChildren()
            this.getParent(this.data.parentId);
        }
        this.createForm();
        this.subscribeToIsParentChanges();
    }

    private getChildren() {
        if (this.data) {
            this.data.children.forEach(singleChildren => this.childrenIds.push(singleChildren.uuid))
        }
    }

    private createForm() {
        this.formGroup = this.formBuilder.group({
                title: new FormControl(this.data?.title, Validators.required),
                subtitle: new FormControl({
                    value: this.data?.subtitle,
                    disabled: !this.data?.isParent
                }),
                type: new FormControl(this.data?.type, Validators.required),
                isParent: new FormControl(this.data?.isParent, {validators: Validators.required}),
                link: new FormControl({
                    value: this.data?.link,
                    disabled: !!(this.data && this.data.isParent)
                }),
                parentId: new FormControl({
                    value: this.data?.parentId,
                    disabled: !!(this.data && this.data.isParent)
                }),
                icon: new FormControl(this.data?.icon),
                exactMatch: new FormControl(this.data?.exactMatch),
                id: new FormControl({
                    value: this.data?.id,
                    disabled: true
                }),
                children: new FormControl({
                    value: this.childrenIds,
                    disabled: !this.data?.isParent
                })
            }
        )
    }

    submitNavigation() {
        this.formGroup.enable()
        if (this.data && this.data.uuid)
            this.navigationService.updateNavigation(this.formGroup.value, this.data.uuid).subscribe((data) => {
                this.navigationService.get().subscribe((data) => {
                    this.dialogRef.close();
                })
            }, (error) => {
                debugger
                this.fuseAlert.show("primary")
            })
        else
            this.navigationService.createNavigation(this.formGroup.value).subscribe((data) => {
                this.navigationService.get().subscribe((data) => {
                    this.dialogRef.close();
                })
            }, (error) => {
                this.errors = error.error
            })
    }

    private subscribeToIsParentChanges() {
        this.formGroup.get('isParent').valueChanges.subscribe(isParent => {
            if (isParent) {
                this.formGroup.get('link').disable();
                this.formGroup.get('parentId').disable();
                this.formGroup.get('subtitle').enable()
                this.updateFormValue(
                    null,
                    this.formGroup.value.title
                );
            } else {
                this.formGroup.get('link').enable();
                this.formGroup.get('parentId').enable();
                this.formGroup.get('subtitle').disable();
            }
        });
        this.formGroup.get('title').valueChanges.subscribe((title) => {
            this.updateFormValue(this.formGroup.value.parentId, title);
        })
        this.formGroup.get('parentId').valueChanges.subscribe((parentId) => {
            this.updateFormValue(parentId, this.formGroup.value.title);
        })
    }

    private getNavigation() {
        this.navigationService.navigation$.subscribe((navigation: any) => {
            this.parentNavigation = navigation;
        })
    }

    private updateFormValue(parentId: any, title) {
        let parentName = parentId ? this.flatNavigation.find(obj => obj['uuid'] == parentId).title : null;
        title = title == undefined || null || '' ? '' : '.' + title
        let idName = parentName && true ? parentName?.replace(/\s/g, '-').toLowerCase() + title?.replace(/\s/g, '-').toLowerCase() : title?.replace(/\s/g, '-').toLowerCase();
        this.formGroup.patchValue({id: idName.startsWith('.') ? idName.substring(1).toString() : idName.toLowerCase()})
    }

    private getParent(parentId) {
        this.parent = this.parentNavigation.find(navigation =>
            navigation.uuid == parentId
        )
    }

    flattenMenu(menu) {
        menu.forEach(item => {
            this.flatNavigation.push(item);
            if (item.children && item.children.length > 0) {
                this.flattenMenu(item.children);
            }
        });
    }

    keys(): Array<string> {
        return Object.keys(this.errors);
    }
}
