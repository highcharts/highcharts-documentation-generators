/* eslint-env: node, es6 */
/**
    @module plugins/add-namespace
    @author Torstein Honsi
 */
'use strict';

exports.handlers = {
    /**
        Extend symbols with namespace which allows us to write short syntax
        like {Chart#redraw}, {@link Chart#redraw} or @lends Chart.prototype.
     */
    jsdocCommentFound: (e) => {
        
        const prefixes = [
            '{@link[\\s\\*]+',
            '@constructor[\\s\\*]+',
            '@lends[\\s\\*]+',
            '@member[Oo]f[\\s]+',
            '@see[\\s]+',
            '@type[\\s]+',
            '{',
            'Array\<',
            'Array\.\<'
        ].join('|');
        const classes = [
            'Chart',
            'Series',
            'Point',
            'Pointer',
            'Axis',
            'Legend',
            'Tooltip',
            'SVGElement',
            'SVGRenderer'
        ].join('|');

        let regex = '(' + prefixes + ')(' + classes + ')([^a-zA-Z])';
        e.comment = e.comment
            .replace(new RegExp(regex, 'g'), '$1Highcharts.$2$3');
    }
};
