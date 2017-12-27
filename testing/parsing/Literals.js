/**
 * Created by: spurcell
 * 9/29/13
 */

"use strict";

const fs = require('fs');
const path = require('path');
const Parser = require('../../parser/Parser');
const util = require('util');

module.exports["literals"] = {

    "bool": function (test) {

        test.deepEqual(new Parser("literal").parse("true").getAst(), { type: 'boolean', val: true });

        test.deepEqual(new Parser("literal").parse("false").getAst(), { type: 'boolean', val: false });

        test.done();
    },

    "number": function (test) {

        var parser = new Parser("literal");

        var result = parser.parse("10");

        test.deepEqual(result.getAst(), { type: 'number', val: '10' });

        test.done();
    },

    "string": function (test) {

        var parser = new Parser("literal");

        var result = parser.parse('"howdy"');

        test.deepEqual(result.getAst(), { type: 'string', val: 'howdy' });

        test.done();
    },

    "array nums": function (test) {

        var parser = new Parser("literal");

        var result = parser.parse('[14, 15.35]');

        test.deepEqual(result.getAst(), { type: 'array',
            elements: [ { type: 'number', val: '14' }, { type: 'number', val: '15.35' } ] });

        test.done();
    },

    "array strings": function (test) {

        var parser = new Parser("literal");

        var result = parser.parse('["the", "moon", "rulez", "#1"]');

        test.deepEqual(result.getAst(),
            { type: 'array',
            elements:
                [ { type: 'string', val: 'the' },
                    { type: 'string', val: 'moon' },
                    { type: 'string', val: 'rulez' },
                    { type: 'string', val: '#1' } ] });

        test.done();
    },

    "nested arrays": function (test) {

        var parser = new Parser("literal");

        var result = parser.parse('[["the"], [["moon", "rulez"], "#1"]]');

        test.deepEqual(result.getAst(),
            { type: 'array',
                elements:
                    [ { type: 'array', elements: [ { type: 'string', val: 'the' } ] },
                        { type: 'array',
                            elements:
                                [ { type: 'array',
                                    elements:
                                        [ { type: 'string', val: 'moon' },
                                            { type: 'string', val: 'rulez' } ] },
                                    { type: 'string', val: '#1' } ] } ] });

        test.done();
    },

    "field": function (test) {

        var parser = new Parser("field");

        var result = parser.parse('age: 28');

        test.deepEqual(result.getAst(),
            { type: 'field',
                label: 'age',
                value: { type: 'number', val: '28' } });

        test.done();
    },

    "compound": function (test) {

        var parser = new Parser("literal");

        var result = parser.parse('(name: "Fry", age: "1024")');

        test.deepEqual(result.getAst(),
            { type: 'compound',
                fields:
                    [ { type: 'field',
                        label: 'name',
                        value: { type: 'string', val: 'Fry' } },
                        { type: 'field',
                            label: 'age',
                            value: { type: 'string', val: '1024' } } ] });

        test.done();
    },

    "setLiteral": function (test) {

        var parser = new Parser("literal");

        var result = parser.parse('{"Surfer Rosa", "Doolittle", "Bossanova", "Trompe le Monde"}');

        test.deepEqual(result.getAst(),
            { type: 'set',
                elements:
                    [ { type: 'string', val: 'Surfer Rosa' },
                        { type: 'string', val: 'Doolittle' },
                        { type: 'string', val: 'Bossanova' },
                        { type: 'string', val: 'Trompe le Monde' } ] });

        test.done();
    },

    "setLiteral without commas": function (test) {

        var parser = new Parser("literal");

        var result = parser.parse('{"Surfer Rosa" "Doolittle" "Bossanova" "Trompe le Monde"}');

        test.deepEqual(result.getAst(),
            { type: 'set',
                elements:
                    [ { type: 'string', val: 'Surfer Rosa' },
                        { type: 'string', val: 'Doolittle' },
                        { type: 'string', val: 'Bossanova' },
                        { type: 'string', val: 'Trompe le Monde' } ] });

        test.done();
    },

    "pair": function (test) {

        var parser = new Parser("pair");

        var result = parser.parse('"Roy Batty" => "replicant"');

        test.deepEqual(result.getAst(),
            { type: 'pair',
                key: { type: 'string', val: 'Roy Batty' },
                value: { type: 'string', val: 'replicant' } });

        test.done();
    },

    "emptyMapLiteral": function (test) {

        var parser = new Parser("literal");

        var result = parser.parse('{ => }');

        test.deepEqual(result.getAst(), { type: 'map', elements: [] });

        test.done();
    },

    "mapLiteral": function (test) {

        var parser = new Parser("literal");

        var result = parser.parse('{"Doolittle" => "The Pixies", "Ziggy Stardust" => "David Bowie"}');

        test.deepEqual(result.getAst(),
            { type: 'map',
                elements:
                    [ { type: 'pair',
                        key: { type: 'string', val: 'Doolittle' },
                        value: { type: 'string', val: 'The Pixies' } },
                        { type: 'pair',
                            key: { type: 'string', val: 'Ziggy Stardust' },
                            value: { type: 'string', val: 'David Bowie' } } ] });

        test.done();
    },

    "mapLiteral without commas": function (test) {

        var parser = new Parser("literal");

        var result = parser.parse('{"Doolittle" => "The Pixies" "Ziggy Stardust" => "David Bowie"}');

        test.deepEqual(result.getAst(),
            { type: 'map',
                elements:
                    [ { type: 'pair',
                        key: { type: 'string', val: 'Doolittle' },
                        value: { type: 'string', val: 'The Pixies' } },
                        { type: 'pair',
                            key: { type: 'string', val: 'Ziggy Stardust' },
                            value: { type: 'string', val: 'David Bowie' } } ] });

        test.done();
    },

    "service literal": function (test) {

        test.deepEqual(new Parser("literal").parse("(foo) { bar = foo; }").getAst(),
            { type: 'procedure',
                params: ['foo'],
                body:
                { type: 'stmt_list',
                    head:
                    { type: 'assign',
                        left: { type: 'id', name: 'bar' },
                        right: { type: 'id', name: 'foo' } },
                    tail: null },
                isService: true });

        test.done();
    }
};