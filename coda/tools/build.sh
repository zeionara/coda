#!/bin/bash

BUILD=build
SRC=src

rm -rf $BUILD/styles || echo 'Build folder does not contain styles, skipping deletion...'
cp -r $SRC/styles $BUILD

npx tsc
