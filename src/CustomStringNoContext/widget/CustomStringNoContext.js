/*
    CustomString
    ========================

    @file      : CustomString.js
    @version   : 2.0.0
    @author    : Roeland Salij
    @date      : Thursday, December 03, 2015
    @copyright : Mendix 2015
    @license   : Apache 2

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text!CustomStringNoContext/widget/template/CustomStringNoContext.html"
], function(declare, _WidgetBase, _TemplatedMixin, dojoArray, dojoLang, widgetTemplate) {
    "use strict";

    // Declare widget's prototype.
    return declare("CustomStringNoContext.widget.CustomStringNoContext", [ _WidgetBase, _TemplatedMixin ], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // Parameters configured in the Modeler.
        sourceMF: "",
        renderHTML: "",

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handles: null,
        _alertDiv: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function() {
            this._handles = [];
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function() {
            this._setupEvents();
            this._render();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        
         // Attach events to HTML dom elements
        _setupEvents: function() {
            if(this.mfToExecute){
                this.connect(this.customString, "click", this._executeMicroflow)};
        },
        _render : function () {
           mx.data.action({
                params       : {
                    actionname : this.sourceMF
                },      
                callback     : dojoLang.hitch(this,function(returnedString) {
                    this.customString.innerHTML = this.checkString(returnedString, this.renderHTML);
                }),
                error        : dojoLang.hitch(this, function(error) {
                    alert(error.description);
                }),
                onValidation : dojoLang.hitch(this, function(validations) {
                    alert("There were " + validations.length + " validation errors");
                })
            });
        },

        _executeMicroflow: function () {
            if (this.mfToExecute) {
                mx.data.action({
                    store: {
                       caller: this.mxform
                    },
                    params: {
                        actionname: this.mfToExecute
                    },
                    callback: function () {
                        // ok
                    },
                    error: function () {
                        // error
                    }

                });
            }
        },


        checkString : function (string, htmlBool) {
        if(string.indexOf("<script") > -1 || !htmlBool)
            string = mxui.dom.escapeHTML(string);   
        return string;  
    	}
    });
});

require(["CustomStringNoContext/widget/CustomStringNoContext"], function() {
    "use strict";
});
