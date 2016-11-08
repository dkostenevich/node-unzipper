'use strict';

var test = require('tap').test;
var fs = require('fs');
var path = require('path');
var temp = require('temp');
var streamBuffers = require("stream-buffers");
var unzip = require('../');
var Stream = require('stream');

// Backwards compatibility for node 0.8
if (!Stream.Writable)
  Stream = require('readable-stream');

test("pipe a single file entry out of a zip", function (t) {
  var writableStream = new streamBuffers.WritableStreamBuffer();
  writableStream.on('close', function () {
    var str = writableStream.getContentsAsString('utf8');
    var fileStr = fs.readFileSync(path.join(__dirname, '../testData/compressed-standard/inflated/file.txt'), 'utf8');
    t.equal(str, fileStr);
    t.end();
  });

  var archive = path.join(__dirname, '../testData/compressed-standard/archive.zip');

  fs.createReadStream(archive)
    .pipe(unzip.ParseOne('file.txt'))
    .pipe(writableStream);
});