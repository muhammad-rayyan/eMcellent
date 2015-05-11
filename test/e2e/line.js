"use strict";

var expect = require('chai').expect;
var eMcellent = require('../../index.js');
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, '../sample/XINDEX.m');

var fileContents;
var results;

describe('Parse 10 Lines of XINDEX.m >', function () {

    before(function (done) {
        fileContents = fs.readFileSync(filePath, 'utf8');
        results = eMcellent.parse(fileContents);
        done();
    });

    it('Test Line Zero', function (done) {
        var result = results[0];
        expect(result.lineLabel).to.equal('XINDEX');
        expect(result.lineComment).to.equal('ISC/REL,GFT,GRK,RWF - INDEX & CROSS-REFERENCE ;08/04/08  13:19');
        done();
    });

    it('Test Line One', function (done) {
        var result = results[1];
        expect(result.lineComment).to.equal(';7.3;TOOLKIT;**20,27,48,61,66,68,110,121,128,132,133**;Apr 25, 1995;Build 15');
        done();
    });

    it('Test Line Two', function (done) {
        var result = results[2];
        expect(result.lineComment).to.equal(' Per VHA Directive 2004-038, this routine should not be modified.');
        done();
    });

    it('Test Line Three', function (done) {
        var result = results[3];
        expect(result.lineRoutines[0].mRoutine).to.equal('G');
        expect(result.lineRoutines[0].mArguments).to.equal('^XINDX6');
        done();
    });

    it('Test Line Four', function (done) {
        var result = results[4];
        expect(result.lineLabel).to.equal('SEP');
        expect(result.lineRoutines[0].mRoutine).to.equal('F');
        expect(result.lineRoutines[0].mArguments).to.equal('I=1:1');
        expect(result.lineRoutines[1].mRoutine).to.equal('S');
        expect(result.lineRoutines[1].mArguments).to.equal('CH=$E(LIN,I)');
        expect(result.lineRoutines[2].mRoutine).to.equal('D');
        expect(result.lineRoutines[2].mArguments).to.equal('QUOTE:CH=Q');
        expect(result.lineRoutines[3].mRoutine).to.equal('Q');
        expect(result.lineRoutines[3].mPostConditional).to.equal('" "[CH');
        done();
    });

    it('Test Line Five', function (done) {
        var result = results[5];
        expect(result.lineRoutines[0].mRoutine).to.equal('S');
        expect(result.lineRoutines[0].mArguments).to.equal('ARG=$E(LIN,1,I-1)');
        expect(result.lineRoutines[1].mRoutine).to.equal('S');
        expect(result.lineRoutines[1].mArguments).to.equal('I=I+1');
        expect(result.lineRoutines[1].mPostConditional).to.equal('CH=" "');
        expect(result.lineRoutines[2].mRoutine).to.equal('S');
        expect(result.lineRoutines[2].mArguments).to.equal('LIN=$E(LIN,I,999)');
        expect(result.lineRoutines[3].mRoutine).to.equal('Q');
        done();
    });

    it('Test Line Six', function (done) {
        var result = results[6];
        expect(result.lineLabel).to.equal('QUOTE');
        expect(result.lineRoutines[0].mRoutine).to.equal('F');
        expect(result.lineRoutines[0].mArguments).to.equal('I=I+1:1');
        expect(result.lineRoutines[1].mRoutine).to.equal('S');
        expect(result.lineRoutines[1].mArguments).to.equal('CH=$E(LIN,I)');
        expect(result.lineRoutines[2].mRoutine).to.equal('Q');
        expect(result.lineRoutines[2].mPostConditional).to.equal('CH=""!(CH=Q)');
        done();
    });

    it('Test Line Seven', function (done) {
        var result = results[7];
        expect(result.lineRoutines[0].mRoutine).to.equal('Q');
        expect(result.lineRoutines[0].mArguments).to.equal('');
        expect(result.lineRoutines[0].mPostConditional).to.equal('CH]""');
        expect(result.lineRoutines[1].mRoutine).to.equal('S');
        expect(result.lineRoutines[1].mArguments).to.equal('ERR=6');
        expect(result.lineRoutines[2].mRoutine).to.equal('G');
        expect(result.lineRoutines[2].mArguments).to.equal('^XINDX1');
        done();
    });

    it('Test Line Eight', function (done) {
        var result = results[8];
        expect(result.lineLabel).to.equal('ALIVE');
        expect(result.lineComment).to.equal('enter here from taskman');
        done();
    });

    it('Test Line Nine', function (done) {
        var result = results[9];
        expect(result.lineRoutines[0].mRoutine).to.equal('D');
        expect(result.lineRoutines[0].mArguments).to.equal('SETUP^XINDX7');
        expect(result.lineComment).to.equal('Get ready to process');
        done();
    });

});
