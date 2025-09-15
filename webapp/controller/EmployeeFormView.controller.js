sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/m/MessagePopover",
  "sap/m/MessageItem",
  "sap/ui/core/library",
  "sap/ui/core/UIComponent",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, MessageToast, MessageBox, MessagePopover, MessageItem, coreLibrary, UIComponent, Filter, FilterOperator) {
  "use strict";

  // Shortcut for sap.ui.core.MessageType
  var MessageType = coreLibrary.MessageType;

  /**
   * @class converted.employeeformview.controller.EmployeeFormView
   * @extends sap.ui.core.mvc.Controller
   * Employee form view controller.
   */
  return Controller.extend("converted.employeeformview.controller.EmployeeFormView", {
    /**
     * Initializes the employee form view controller.
     * @public
     * @override
     */
    onInit: function () {
      // Load mock data for employees
      var oEmployeeModel = new JSONModel();
      oEmployeeModel.loadData("model/mockData/employees.json");
      this.getView().setModel(oEmployeeModel, "employees");

      // Load mock data for departments
      var oDepartmentModel = new JSONModel();
      oDepartmentModel.loadData("model/mockData/departments.json");
      this.getView().setModel(oDepartmentModel, "departments");

      // Load customer data from mock data
      var oCustomerModel = new JSONModel();
      oCustomerModel.loadData("model/mockData/customers.json");
      this.getView().setModel(oCustomerModel, "customers");

      // Load product data from mock data
      var oProductModel = new JSONModel();
      oProductModel.loadData("model/mockData/products.json");
      this.getView().setModel(oProductModel, "products");

      // Load any additional mock data as needed
      var oOrderModel = new JSONModel();
      oOrderModel.loadData("model/mockData/orders.json");
      this.getView().setModel(oOrderModel, "orders");

      // Initialize message model for MessageArea/MessagePopover
      var oMessageModel = new JSONModel({
        messages: [{
          type: MessageType.Success,
          title: "System Information",
          description: "Application converted successfully, Use AI optimize for better result",
          subtitle: "Conversion complete",
          counter: 1
        }]
      });
      this.getView().setModel(oMessageModel, "messages");

      // Converted from WebDynpro: 2025-09-15T12:28:34.624Z
    },

    /**
     * Called before the view is rendered.
     * @public
     * @override
     */
    onBeforeRendering: function () {
      // Prepare data before rendering
    },

    /**
     * Called after the view is rendered.
     * @public
     * @override
     */
    onAfterRendering: function () {
      // Adjust UI after rendering
    },

    /**
     * Handle value help request (for ValueHelp / F4 elements)
     * @param {sap.ui.base.Event} oEvent The event object
     */
    handleValueHelp: function (oEvent) {
      var oSource = oEvent.getSource();

      // Create value help dialog if it doesn't exist
      if (!this._valueHelpDialog) {
        this._valueHelpDialog = new sap.m.SelectDialog({ // corrected class name
          title: "Select Value",
          confirm: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
              oSource.setValue(oSelectedItem.getTitle());
            }
          },
          cancel: function () {
            this._valueHelpDialog.close();
          }.bind(this)
        });

        // Sample items - would be filled with actual data in a real app
        var oDialogModel = new JSONModel({
          items: [{
              title: "Item 1",
              description: "Description 1"
            },
            {
              title: "Item 2",
              description: "Description 2"
            },
            {
              title: "Item 3",
              description: "Description 3"
            }
          ]
        });

        this._valueHelpDialog.setModel(oDialogModel);
        this._valueHelpDialog.bindAggregation("items", {
          path: "/items",
          template: new sap.m.StandardListItem({ // corrected class name
            title: "{title}",
            description: "{description}"
          })
        });
      }

      // Open the dialog
      this._valueHelpDialog.open();
    },

    /**
     * Handle file download requests (for FileDownload elements)
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onFileDownload: function (oEvent) {
      // In a real application, this would be connected to a backend service
      // For now, we'll show a message
      MessageToast.show("File download initiated");

      // Sample approach to download a file:
      // var sUrl = "/api/downloadFile?id=123";
      // var link = document.createElement("a");
      // link.href = sUrl;
      // link.download = "filename.pdf";
      // link.click();
    },

    /**
     * Open message popover (for MessageArea elements)
     * @param {sap.ui.base.Event} oEvent The event object
     */
    handleMessagePopoverPress: function (oEvent) {
      if (!this._messagePopover) {
        this._messagePopover = new MessagePopover({
          items: {
            path: "messages>/messages",
            template: new MessageItem({
              type: "{messages>type}",
              title: "{messages>title}",
              description: "{messages>description}",
              subtitle: "{messages>subtitle}",
              counter: "{messages>counter}"
            })
          }
        });

        this.getView().byId("messagePopoverBtn").addDependent(this._messagePopover);
      }

      this._messagePopover.toggle(oEvent.getSource());
    },

    /**
     * Handle navigation link press events
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onNavigationLinkPress: function (oEvent) {
      var oSource = oEvent.getSource();
      var sHref = oSource.getHref();

      if (sHref) {
        // If href is set, let the default behavior handle it
        return;
      }

      // Otherwise, handle the navigation programmatically
      var sNavTarget = oSource.data("navTarget");
      if (sNavTarget) {
        MessageToast.show("Navigating to: " + sNavTarget);
        // In a real application, this would navigate to the appropriate view or application
        // using the router
      }
    },

    /**
     * Handle office control rendering
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onOfficeControlRendered: function (oEvent) {
      // This would normally integrate with MS Office API or similar
      // In a converted application, this would be replaced by a more appropriate solution
      console.log("Office control container rendered");

      var oSource = oEvent.getSource();
      var sDomRef = oSource.getDomRef();
      if (sDomRef) {
        sDomRef.innerHTML = '<div class="sapUiMediumMargin">' +
          '<div class="sapUiMediumMarginBottom">' +
          '<span class="sapUiIcon sapUiIconMirrorInRTL" style="font-family:SAP-icons;color:#0854a0;font-size:2.5rem">&#xe0ef;</span>' +
          '</div>' +
          '<div class="sapMText">' +
          '<p>Office document integration would be configured here.</p>' +
          '<p>In SAPUI5, this typically uses OData services with MS Graph API integration.</p>' +
          '</div>' +
          '</div>';
      }
    },

    /**
     * Open dialog
     * This is a generic handler for WebDynpro dialog elements
     * @param {sap.ui.base.Event} oEvent The event object
     */
    openDialog: function (oEvent) {
      // Get the dialog ID from the source control
      var oSource = oEvent.getSource();
      var sDialogId = oSource.data("dialogId") || "confirmDialog";

      // Find the dialog in the view
      var oDialog = this.getView().byId(sDialogId);
      if (oDialog) {
        oDialog.open();
      } else {
        MessageToast.show("Dialog with ID '" + sDialogId + "' not found");
      }
    },

    /**
     * Close dialog
     * @param {sap.ui.base.Event} oEvent The event object
     */
    closeDialog: function (oEvent) {
      var oDialog = oEvent.getSource().getParent();
      oDialog.close();
    },

    /**
     * Handle dialog confirm button press
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onDialogConfirm: function (oEvent) {
      // Handle dialog confirmation logic
      MessageToast.show("Dialog confirmed");
      this.closeDialog(oEvent);
    },

    /**
     * Handle dialog cancel button press
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onDialogCancel: function (oEvent) {
      // Handle dialog cancellation
      this.closeDialog(oEvent);
    },

    /**
     * Navigate to SecondView
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onNextPress: function (oEvent) {
      // Get the router instance
      var oRouter = UIComponent.getRouterFor(this);

      // Navigate to the 'second' route
      oRouter.navTo("second");
    },

    /**
     * Navigate back to main view
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onBackPress: function (oEvent) {
      // Get the router instance
      var oRouter = UIComponent.getRouterFor(this);

      // Navigate to the 'main' route
      oRouter.navTo("main");
    },

    /**
     * Navigate to a specific route
     * @param {string} sRoute The route name to navigate to
     */
    navTo: function (sRoute) {
      var oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo(sRoute);
    },

    /**
     * Handles the Save button press.
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onSavePress: function (oEvent) {
      // Handle save logic here.  This is a placeholder.  Replace with actual code.
      // Assuming you have a model named 'employees' bound to your view
      var oModel = this.getView().getModel("employees");
      if (oModel) {
        // Simulate saving data (replace with actual save logic)
        MessageToast.show("Employee data saved successfully!");
      } else {
        MessageBox.error("Employee model not found!");
      }
    },

    /**
     * Populates the department dropdown.
     * This is a placeholder; replace with actual code.
     */
    getDepartments: function () {
      // replace with your actual data retrieval method.  This is a placeholder.
      return []; // Return an array of WDDepartment objects
    },

    /**
     * Retrieves employee data.
     * This is a placeholder; replace with actual code.
     */
    getEmployeeData: function () {
      // replace with your actual data retrieval method.  This is a placeholder.  Returns an instance of your employee data object.
      return {}; // Return an instance of WDEmployee
    },
    /**
     * Applies search filter to the employee table.
     * @param {sap.ui.base.Event} oEvent The search event.
     */
    onSearch: function (oEvent) {
      var sQuery = oEvent.getParameter("query");

      if (sQuery) {
        var oFilter = new Filter("firstName", FilterOperator.Contains, sQuery);
        var oTable = this.getView().byId("employeeTable");
        var oBinding = oTable.getBinding("items");
        oBinding.filter([oFilter]);
      } else {
        this.onClearSearch();
      }
    },

    /**
     * Clears the search filter from the employee table.
     */
    onClearSearch: function () {
      var oTable = this.getView().byId("employeeTable");
      var oBinding = oTable.getBinding("items");
      oBinding.filter([]); // Clear the filter
    },
    /**
     * Exports the employee data to a CSV file.
     */
    onExportToCSV: function () {
      var oTable = this.getView().byId("employeeTable");
      var aData = oTable.getModel("employees").getData().employees; // Get employee data
      var sCsvContent = this._convertToCSV(aData);
      var oBlob = new Blob([sCsvContent], {
        type: 'text/csv'
      });
      var sUrl = URL.createObjectURL(oBlob);
      var oLink = document.createElement('a');
      oLink.href = sUrl;
      oLink.download = 'employee_data.csv';
      oLink.click();
      URL.revokeObjectURL(sUrl);
    },

    /**
     * Converts employee data to CSV format.
     * @param {Array} aData Array of employee objects.
     * @private
     * @returns {string} CSV formatted string.
     */
    _convertToCSV: function (aData) {
      if (!aData || aData.length === 0) return '';
      var aHeaders = Object.keys(aData[0]);
      var sCsv = aHeaders.join(',') + '\n';
      aData.forEach(function (row) {
        var aValues = aHeaders.map(function (header) {
          return '"' + (row[header] || '').toString().replace(/"/g, '""') + '"';
        });
        sCsv += aValues.join(',') + '\n';
      });
      return sCsv;
    },
    /**
     * Validates the form inputs.
     * @private
     * @returns {boolean} True if the form is valid, false otherwise.
     */
    _validateForm: function () {
      var bValid = true;
      var aInputs = ["inputFirstName", "inputLastName", "inputEmail", "inputDepartment", "inputHireDate"].map(function (id) {
        return this.getView().byId(id);
      }.bind(this));

      aInputs.forEach(function (oInput) {
        if (oInput) {
          var sValue = oInput.getValue();
          if (!sValue || sValue.trim() === "") {
            oInput.setValueState(sap.ui.core.ValueState.Error);
            oInput.setValueStateText("This field is required");
            bValid = false;
          } else {
            oInput.setValueState(sap.ui.core.ValueState.None);
          }
        }
      });

      return bValid;
    }
  });
});
