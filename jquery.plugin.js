;
/*
 * The semi-colon before function invocation is a safety net against concatenated
 * scripts and/or other plugins which may not be closed properly.
 */

/**
 * 
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} undefined
 * @returns {undefined}
 */
(function ($, window, document, undefined) {

    /*
     * undefined is used here as the undefined global variable in ECMAScript 3 is
     * mutable (ie. it can be changed by someone else). undefined isn't really being
     * passed in so we can ensure the value of it is truly undefined. In ES5, undefined
     * can no longer be modified.
     *
     * window and document are passed through as local variables rather than global
     * as this (slightly) quickens the resolution process and can be more efficiently
     * minified (especially when both are regularly referenced in your plugin).
     *
     */

    "use strict";

    if (!$) {
        console.error("jQuery não encontrado, seu plugin jQuery não irá funcionar.");
        return false;
    }

    // Create the defaults once
    var pluginName = "parallaxScroll";

    /**
     * Store the plugin name in a variable. It helps you if later decide to 
     * change the plugin's name
     * @type {String}
     */
    var pluginName = 'jqueryPlugin';

    /**
     * The plugin constructor
     * @param {DOM Element} element The DOM element where plugin is applied
     * @param {Object} options Options passed to the constructor
     */
    function Plugin(element, options) {

        // stores the plugin name O_O
        this._name = pluginName;

        // Store a reference to the source element
        this.el = element;

        // Store a jQuery reference  to the source element
        this.$el = $(element);

        // Set the instance options extending the plugin defaults and
        // the options passed by the user

        /*
         * jQuery has an extend method which merges the contents of two or
         * more objects, storing the result in the first object. The first object
         * is generally empty as we don't want to alter the default options for
         * future instances of the plugin
         * 
         * To make this recursive, for merge something like:
         * 
         * @example 
         * var options = {
         *    elem: "#someElementID",
         *    size: { 
         *        width: 0, 
         *        height: 0 
         *    }
         * }
         * 
         * Use @example $.extend(true, {}, defaults, options);
         */
        this.settings = $.extend({}, $.fn[pluginName].defaults, options);

        // Initialize the plugin instance
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        /**
         * Initialize the plugin instance.
         * Set any other attribtes, store any other element reference, register 
         * listeners, etc
         *
         * When bind listerners remember to name tag it with your plugin's name.
         * Elements can have more than one listener attached to the same event
         * so you need to tag it to unbind the appropriate listener on destroy:
         * 
         * @example
         * this.$someSubElement.on('click.' + pluginName, function() {
         *      // Do something
         * });
         *
         *
         * You already have access to the DOM element and the options via the 
         * instance.
         *
         * @example this.element; this.settings;
         *
         * You can add more functions like the one below and call them.
         *
         * @example this.yourOtherFunction("jQuery Boilerplate");
         *
         */
        init: function () {

            $(elem).each(function () {
                var elem = $(this);
                $(window).scroll(function () {
                    console.log(elem);
                    var e = -($(window).scrollTop() / o), a = "50% " + e + "px";
                    elem.css("margin-bottom", a)
                });
            });

        },
        yourOtherFunction: function (text) {

            // some logic
            $(this.element).text(text);
        },
        /**
         * The 'destroy' method is were you free the resources used by your plugin:
         * references, unregister listeners, etc.
         *
         * Remember to unbind for your event:
         *
         * @example
         * this.$someSubElement.off('.' + pluginName);
         *
         * Above example will remove any listener from your plugin for on the given
         * element.
         */
        destroy: function () {

            // Remove any attached data from your plugin
            this.$el.removeData();
        },
        /**
         * Write public methods within the plugin's prototype. They can 
         * be called with:
         *
         * @example
         * $('#element').jqueryPlugin('somePublicMethod','Arguments', 'Here', 1001);
         *  
         * @param  {[type]} foo [some parameter]
         * @param  {[type]} bar [some other parameter]
         * @return {[type]}
         */
        somePublicMethod: function (foo, bar) {

            // This is a call to a pseudo private method
            this._pseudoPrivateMethod();

            // This is a call to a real private method. You need to use 'call' or 'apply'
            privateMethod.call(this);
        }
    });


    /**
     * This is a real private method. A plugin instance has access to it
     * @return {[type]}
     */
    var privateMethod = function () {
        console.log("privateMethod");
        console.log(this);
    };


    /**
     * @description
     * This is were we register our plugin withint jQuery plugins.
     * It is a plugin wrapper around the constructor and prevents agains multiple
     * plugin instantiation (soteing a plugin reference within the element's data).
     *
     * @example
     * $('#element').jqueryPlugin({
     *     defaultOption: 'this options overrides a default plugin option',
     *     additionalOption: 'this is a new option'
     * });
     */
    $.fn[ pluginName ] = function (options) {

        var args = arguments;

        if (options === undefined || typeof options === 'object') {
            /*
             * Creates a new plugin instance, for each selected element, and
             * stores a reference withint the element's data
             */
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        } else if (typeof options === 'string' && options !== 'init') {
            /* 
             * Call a public plugin method for each selected element and returns this to not break chainbility.
             */
            return this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });
        }
    };


    /**
     * Default options
     */
    $.fn[pluginName].defaults = {
        defaultOption: "I'm a default option"
    };

})(window.jQuery || false, window, document);
