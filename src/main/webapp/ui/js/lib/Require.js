window.Require = {
    /// <summary>Checks value(s) for null, undefined, or truthyness</summary>

    IsNotNull: function (value, name) {
        /// <signature>
        /// <summary>Throws an error if value is null or undefined</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// <param name="name" type="String">Name of property to evaluate</param>
        /// </signature>
        /// <signature>
        /// <summary>Throws an error if value is null or undefined</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// </signature>

        if (value === undefined) {
            throw new Error('The ' + (name || 'value') + ' cannot be undefined.');
        }
        else if (value === null) {
            throw new Error('The ' + (name || 'value') + ' cannot be null.');
        }
    },

    IsNotNullOrWhiteSpace: function (value, name) {
        /// <signature>
        /// <summary>Throws an error if value is null, undefined, or contains only white space characters</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// <param name="name" type="String">Name of property to evaluate</param>
        /// </signature>
        /// <signature>
        /// <summary>Throws an error if value is null, undefined, or contains only white space characters</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// </signature>

        if (value !== undefined && (value === '' || (value.trim && value.trim() === ''))) {
            throw new Error('The ' + (name || 'value') + ' cannot contain only white space characters.');
        }
        else {
            Require.IsNotNull(value, name);
        }
    },

    AreNotNullOrWhiteSpace: function (values) {
        /// <summary>Throws an error if any element of values is null, undefined, or contains only white space characters</summary>
        /// <param name="values" type="Array">Array of objects to evaluate.</param>

        for (var idx in values) {
            Require.IsNotNullOrWhiteSpace(values[idx]);
        }
    },

    AreNotNull: function (values) {
        /// <summary>Throws an error if any element of values is null or undefined</summary>
        /// <param name="values" type="Array">Array of objects to evaluate.</param>

        for (var idx in values) {
            Require.IsNotNull(values[idx]);
        }
    },

    Is: function (value, name) {
        /// <signature>
        /// <summary>Throws an error if value is not true</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// <param name="name" type="String">Name of property to evaluate</param>
        /// </signature>
        /// <signature>
        /// <summary>Throws an error if value is not true</summary>
        /// <param name="value" type="Object">Value to evaluate.</param>
        /// </signature>

        if (value !== true) {
            throw new Error('The ' + (name || 'value') + ' must be true.');
        }
    }
};