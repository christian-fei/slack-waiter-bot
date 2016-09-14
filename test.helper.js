'use strict'
const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)

global.chai = chai
global.expect = chai.expect
