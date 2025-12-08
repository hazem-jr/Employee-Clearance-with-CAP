sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/plugins/UploadSetwithTable",

], (Controller, MessageBox, Fragment, Filter, FilterOperator ,UploadSetwithTable) => {
    "use strict";

    return Controller.extend("clearance001.controller.Main", {
        onInit() {
            //this.documentTypes = this.getFileCategories();
            //this.oMockServer = new MockServer();
            // var docsModel = this.byId("table-uploadSet").getModel("documents");
            // var oBinding = 
        },
        submit: function () {
            debugger;
            
            var employeeName = this.getView().byId("id_employeeName").getValue();
            var employeeNumber = this.getView().byId("id_employeeNumber").getValue();
            var nationality = this.getView().byId("id_nationality").getValue();
            var department = this.getView().byId("id_department").getValue();
            var title = this.getView().byId("id_title").getValue();
            var oRadioButtonGroup = this.getView().byId("RBG_reason_ID");
            var notes = this.getView().byId("id_notes").getValue();

            // the clearance Reason 
            var oSelectedButton = oRadioButtonGroup.getSelectedButton();
            if (oSelectedButton) {
                var reason = oSelectedButton.getText();
            }

            // Model - communcation btw BE and FE
            var oModel = this.getView().getModel();

            // initiate the creation of a new entity 
            //by invoke the create method to send data to the backend 
            var oContext = oModel.bindList("/clearance").create({
                "employeeName": employeeName,
                "employeeNumber": employeeNumber,
                "nationality": nationality,
                "department": department,
                "title": title,
                "reason": reason,
                "notes": notes
            });
            // show the result 
            oContext.created().then(() => {
                //message
                MessageBox.success("Form Submited");
                this.getView().byId("id_employeeName").setValue(null);
                this.getView().byId("id_employeeNumber").setValue(null);
                this.getView().byId("id_nationality").setValue(null);
                this.getView().byId("id_department").setValue(null);
                this.getView().byId("id_title").setValue(null);
                this.getView().byId("id_reason").setValue(null);
                this.getView().byId("id_notes").setValue(null);
            }).catch((err) => {
                //message
                MessageBox.error("Error when submitting the Form");
                console.error("Error submitting the Form : " + err);
            })
        },

        onCollapseExpandPress() {
            const oSideNavigation = this.byId("sideNavigation"),
                bExpanded = oSideNavigation.getExpanded();

            oSideNavigation.setExpanded(!bExpanded);
        },
        onAddNewApplication() {
            this.hideAllPanels();
            var oPanel = this.byId("_IDGenPanel1");
            oPanel.setVisible(true);
        },
        onViewApplications() {
            this.hideAllPanels();
            this.byId("_IDGenPanel").setVisible(true);
        },
        onEditRecordPressed: function () {
            this.hideAllPanels();
            this.byId("_IDGenPanel2").setVisible(true);
        },
        onGoToHome() {
            this.hideAllPanels();
        },
        hideAllPanels() {
            this.byId("_IDGenPanel").setVisible(false);
            this.byId("_IDGenPanel1").setVisible(false);
            this.byId("_IDGenPanel2").setVisible(false);
        },
        onActionPressed: function (oEvent) {
            //debugger;

            var oButton = oEvent.getSource();
            this.oSelectedContext = oButton.getBindingContext(); // Fixed typo

            // If the fragment is not created yet
            if (!this._oActionSheet) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "clearance001.view.ActionSheet",
                    controller: this
                }).then(function (oActionSheet) {

                    this._oActionSheet = oActionSheet;          // Save instance
                    this.getView().addDependent(this._oActionSheet);

                    this._oActionSheet.openBy(oButton);         // Open from button
                }.bind(this));
            } else {
                this._oActionSheet.openBy(oButton);             // Already created → open directly
            }
        },
        onDeletePressed: function () {
            var oContext = this.oSelectedContext;
            var ID = oContext.getProperty("ID");
            var Name = oContext.getProperty("employeeName");

            MessageBox.confirm(
                "Are you sure you want to delete the record for employee: " + Name + "?",
                {
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    onClose: function (oAction) {

                        if (oAction === MessageBox.Action.YES) {

                            oContext.delete("$direct")
                                .then(function () {
                                    MessageBox.success("Record " + ID + " deleted successfully.");
                                })
                                .catch(function (oError) {
                                    MessageBox.error("Error deleting the record with ID " + ID + "!");
                                });

                        }
                    }
                }
            );
        },

        onEditPressed: function () {
            debugger;
            var oData = this.oSelectedContext.getObject();
            this.onEditRecordPressed();
            var clearanceRecord = this.getOwnerComponent().getModel();
            // filter on the OData
            let Filters = [new Filter("ID", FilterOperator.EQ, oData.ID)];
            let oBinding = clearanceRecord.bindList("/clearance");
            oBinding.filter(Filters);
            oBinding.requestContexts().then((aContexts) => {
                if (aContexts.length > 0) {
                    aContexts.forEach((oContext) => {
                        let record = oContext.getObject();
                        this.getView().byId("id_ID11").setValue(record.ID);
                        this.getView().byId("id_employeeName111").setValue(record.employeeName);
                        this.getView().byId("id_employeeNumber1").setValue(record.employeeNumber);
                        this.getView().byId("id_nationality1").setValue(record.nationality);
                        this.getView().byId("id_department1").setValue(record.department);
                        this.getView().byId("id_title1").setValue(record.title);
                        this.getView().byId("id_reason").setValue(record.reason);
                        this.getView().byId("id_notes1").setValue(record.notes);
                    });
                } else {
                    MessageBox.error("The Document ID is not Found!");
                }
            }).catch((oError) => {
                MessageBox.error("Error Retrieving Document Details" + oError);
            });
        },
        onUpdateRecord: function () {
            debugger;
            var recordID = this.getView().byId("id_ID11").getValue();
            var employeeName = this.getView().byId("id_employeeName111").getValue();
            var employeeNumber = this.getView().byId("id_employeeNumber1").getValue();
            var nationality = this.getView().byId("id_nationality1").getValue();
            var department = this.getView().byId("id_department1").getValue();
            var title = this.getView().byId("id_title1").getValue();
            var notes = this.getView().byId("id_notes1").getValue();

            var updateOModel = this.getView().getModel();
            var path = "/clearance('" + recordID + "')";
            var oContext = updateOModel.bindContext(path).getBoundContext();

            var oView = this.getView();
            function resetBusy() {
                oView.setBusy(false);
            }

            // fill the request properties
            oContext.setProperty("employeeName", employeeName);
            oContext.setProperty("employeeNumber", employeeNumber);
            oContext.setProperty("nationality", nationality);
            oContext.setProperty("department", department);
            oContext.setProperty("title", title);
            oContext.setProperty("notes", notes);

            updateOModel.submitBatch("auto").then(function () {
                resetBusy();
                MessageBox.success("Item details Updated sucssefully");
            }).catch(function (err) {
                MessageBox.error("Error occured while update" + err);
            });
        },

        formatReqStatusText: function (sStatus) {
            debugger;
            switch (sStatus) {
                case "A":
                    return "Approved";
                case "R":
                    return "Rejected";
                default:
                    return "Pending";
            }
        },
        formatReqStatusState: function (sStatus) {
            debugger;
            switch (sStatus) {
                case "A":
                    return sap.ui.core.ValueState.Success;
                case "R":
                    return sap.ui.core.ValueState.Error;
                case "P":
                    return sap.ui.core.ValueState.warning;
            }

        },
        onBeforeUploadStarts: function () {
            // This code block is only for demonstration purpose to simulate XHR requests, hence starting the mockserver.
            this.oMockServer.start();
        }
        /// handle attachmants Part 


        // onPluginActivated: function (oEvent) {
        //     this.oUploadPluginInstance = oEvent.getParameter("oPlugin");
        // },
        // getIconSrc: function (mediaType, thumbnailUrl) {
        //     return UploadSetwithTable.getIconForFileType(mediaType, thumbnailUrl);
        // },
        // // Table row selection handler
        // onSelectionChange: function (oEvent) {
        //     const oTable = oEvent.getSource();
        //     const aSelectedItems = oTable?.getSelectedContexts();
        //     const oDownloadBtn = this.byId("downloadSelectedButton");
        //     const oEditUrlBtn = this.byId("editUrlButton");
        //     const oRenameBtn = this.byId("renameButton");
        //     const oRemoveDocumentBtn = this.byId("removeDocumentButton");

        //     if (aSelectedItems.length > 0) {
        //         oDownloadBtn.setEnabled(true);
        //     } else {
        //         oDownloadBtn.setEnabled(false);
        //     }
        //     if (aSelectedItems.length === 1) {
        //         oEditUrlBtn.setEnabled(true);
        //         oRenameBtn.setEnabled(true);
        //         oRemoveDocumentBtn.setEnabled(true);
        //     } else {
        //         oRenameBtn.setEnabled(false);
        //         oEditUrlBtn.setEnabled(false);
        //         oRemoveDocumentBtn.setEnabled(false);
        //     }
        // },
        // // Download files handler
        // onDownloadFiles: function (oEvent) {
        //     const oContexts = this.byId("table-uploadSet").getSelectedContexts();
        //     if (oContexts && oContexts.length) {
        //         oContexts.forEach((oContext) => this.oUploadPluginInstance.download(oContext, true));
        //     }
        // },
        // // UploadCompleted event handler
        // onUploadCompleted: function (oEvent) {
        //     const oModel = this.byId("table-uploadSet").getModel("documents");
        //     const iResponseStatus = oEvent.getParameter("status");

        //     // check for upload is sucess
        //     if (iResponseStatus === 201) {
        //         oModel.refresh(true);
        //         setTimeout(function () {
        //             MessageToast.show("Document Added");
        //         }, 1000);
        //     }
        //     // This code block is only for demonstration purpose to simulate XHR requests, hence restoring the server to not fake the xhr requests.
        //     this.oMockServer.restore();
        // },
        // onRemoveButtonPress: function (oEvent) {
        //     var oTable = this.byId("table-uploadSet");
        //     const aContexts = oTable.getSelectedContexts();
        //     this.removeItem(aContexts[0]);
        // },
        // onRemoveHandler: function (oEvent) {
        //     var oSource = oEvent.getSource();
        //     const oContext = oSource.getBindingContext("documents");
        //     this.removeItem(oContext);
        // },
        // removeItem: function (oContext) {
        //     const oModel = this.getView().getModel("documents");
        //     const oTable = this.byId("table-uploadSet");
        //     MessageBox.warning(
        //         "Are you sure you want to remove the document" + " " + oContext.getProperty("fileName") + " " + "?",
        //         {
        //             icon: MessageBox.Icon.WARNING,
        //             actions: ["Remove", MessageBox.Action.CANCEL],
        //             emphasizedAction: "Remove",
        //             styleClass: "sapMUSTRemovePopoverContainer",
        //             initialFocus: MessageBox.Action.CANCEL,
        //             onClose: function (sAction) {
        //                 if (sAction !== "Remove") {
        //                     return;
        //                 }
        //                 var spath = oContext.getPath();
        //                 if (spath.split("/")[2]) {
        //                     var index = spath.split("/")[2];
        //                     var data = oModel.getProperty("/items");
        //                     data.splice(index, 1);
        //                     oModel.refresh(true);
        //                     if (oTable && oTable.removeSelections) {
        //                         oTable.removeSelections();
        //                     }
        //                 }
        //             }
        //         }
        //     );
        // },
        // getFileCategories: function () {
        //     return [
        //         { categoryId: "Invoice", categoryText: "Invoice" },
        //         { categoryId: "Specification", categoryText: "Specification" },
        //         { categoryId: "Attachment", categoryText: "Attachment" },
        //         { categoryId: "Legal Document", categoryText: "Legal Document" }
        //     ];
        // },
        // getFileSizeWithUnits: function (iFileSize) {
        //     return UploadSetwithTable.getFileSizeWithUnits(iFileSize);
        // },
        // openPreview: function (oEvent) {
        //     const oSource = oEvent.getSource();
        //     const oBindingContext = oSource.getBindingContext("documents");
        //     if (oBindingContext && this.oUploadPluginInstance) {
        //         this.oUploadPluginInstance.openFilePreview(oBindingContext);
        //     }
        // }

        //// Trigger the WorkFlow ///////
    });
});