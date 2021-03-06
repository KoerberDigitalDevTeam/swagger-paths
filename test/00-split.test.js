'use strict'

const expect = require('chai').expect
const split = require('../lib/split')

describe('Path splitting function', () => {
  it('should split paths', () => {
    expect(split('')).to.eql([ ])
    expect(split('/')).to.eql([ ])
    expect(split('//')).to.eql([ ])

    expect(split('abc')).to.eql([ 'abc' ])
    expect(split('/abc')).to.eql([ 'abc' ])
    expect(split('//abc')).to.eql([ 'abc' ])
    expect(split('abc/')).to.eql([ 'abc' ])
    expect(split('/abc/')).to.eql([ 'abc' ])
    expect(split('//abc/')).to.eql([ 'abc' ])
    expect(split('abc//')).to.eql([ 'abc' ])
    expect(split('/abc//')).to.eql([ 'abc' ])
    expect(split('//abc//')).to.eql([ 'abc' ])

    expect(split('abc/def')).to.eql([ 'abc', 'def' ])
    expect(split('/abc/def')).to.eql([ 'abc', 'def' ])
    expect(split('//abc/def')).to.eql([ 'abc', 'def' ])
    expect(split('abc/def/')).to.eql([ 'abc', 'def' ])
    expect(split('/abc/def/')).to.eql([ 'abc', 'def' ])
    expect(split('//abc/def/')).to.eql([ 'abc', 'def' ])
    expect(split('abc/def//')).to.eql([ 'abc', 'def' ])
    expect(split('/abc/def//')).to.eql([ 'abc', 'def' ])
    expect(split('//abc/def//')).to.eql([ 'abc', 'def' ])
    expect(split('abc//def//')).to.eql([ 'abc', 'def' ])
    expect(split('/abc//def//')).to.eql([ 'abc', 'def' ])
    expect(split('//abc//def//')).to.eql([ 'abc', 'def' ])
  })

  it('should split paths and re-encode components by default', () => {
    expect(split('')).to.eql([ ])
    expect(split('/')).to.eql([ ])
    expect(split('//')).to.eql([ ])

    expect(split('a^c')).to.eql([ 'a%5Ec' ])
    expect(split('/a^c')).to.eql([ 'a%5Ec' ])
    expect(split('//a^c')).to.eql([ 'a%5Ec' ])
    expect(split('a^c/')).to.eql([ 'a%5Ec' ])
    expect(split('/a^c/')).to.eql([ 'a%5Ec' ])
    expect(split('//a^c/')).to.eql([ 'a%5Ec' ])
    expect(split('a^c//')).to.eql([ 'a%5Ec' ])
    expect(split('/a^c//')).to.eql([ 'a%5Ec' ])
    expect(split('//a^c//')).to.eql([ 'a%5Ec' ])

    expect(split('a^c/d私f')).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('/a^c/d私f')).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('//a^c/d私f')).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('a^c/d私f/')).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('/a^c/d私f/')).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('//a^c/d私f/')).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('a^c/d私f//')).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('/a^c/d私f//')).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('//a^c/d私f//')).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('a^c//d私f//')).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('/a^c//d私f//')).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('//a^c//d私f//')).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
  })

  it('should split paths and re-encode components when forced to do so', () => {
    expect(split('', true)).to.eql([ ])
    expect(split('/', true)).to.eql([ ])
    expect(split('//', true)).to.eql([ ])

    expect(split('a^c', true)).to.eql([ 'a%5Ec' ])
    expect(split('/a^c', true)).to.eql([ 'a%5Ec' ])
    expect(split('//a^c', true)).to.eql([ 'a%5Ec' ])
    expect(split('a^c/', true)).to.eql([ 'a%5Ec' ])
    expect(split('/a^c/', true)).to.eql([ 'a%5Ec' ])
    expect(split('//a^c/', true)).to.eql([ 'a%5Ec' ])
    expect(split('a^c//', true)).to.eql([ 'a%5Ec' ])
    expect(split('/a^c//', true)).to.eql([ 'a%5Ec' ])
    expect(split('//a^c//', true)).to.eql([ 'a%5Ec' ])

    expect(split('a^c/d私f', true)).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('/a^c/d私f', true)).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('//a^c/d私f', true)).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('a^c/d私f/', true)).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('/a^c/d私f/', true)).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('//a^c/d私f/', true)).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('a^c/d私f//', true)).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('/a^c/d私f//', true)).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('//a^c/d私f//', true)).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('a^c//d私f//', true)).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('/a^c//d私f//', true)).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
    expect(split('//a^c//d私f//', true)).to.eql([ 'a%5Ec', 'd%E7%A7%81f' ])
  })

  it('should split paths and leave components unchanged when forced to do so', () => {
    expect(split('', false)).to.eql([ ])
    expect(split('/', false)).to.eql([ ])
    expect(split('//', false)).to.eql([ ])

    expect(split('a^c', false)).to.eql([ 'a^c' ])
    expect(split('/a^c', false)).to.eql([ 'a^c' ])
    expect(split('//a^c', false)).to.eql([ 'a^c' ])
    expect(split('a^c/', false)).to.eql([ 'a^c' ])
    expect(split('/a^c/', false)).to.eql([ 'a^c' ])
    expect(split('//a^c/', false)).to.eql([ 'a^c' ])
    expect(split('a^c//', false)).to.eql([ 'a^c' ])
    expect(split('/a^c//', false)).to.eql([ 'a^c' ])
    expect(split('//a^c//', false)).to.eql([ 'a^c' ])

    expect(split('a^c/d私f', false)).to.eql([ 'a^c', 'd私f' ])
    expect(split('/a^c/d私f', false)).to.eql([ 'a^c', 'd私f' ])
    expect(split('//a^c/d私f', false)).to.eql([ 'a^c', 'd私f' ])
    expect(split('a^c/d私f/', false)).to.eql([ 'a^c', 'd私f' ])
    expect(split('/a^c/d私f/', false)).to.eql([ 'a^c', 'd私f' ])
    expect(split('//a^c/d私f/', false)).to.eql([ 'a^c', 'd私f' ])
    expect(split('a^c/d私f//', false)).to.eql([ 'a^c', 'd私f' ])
    expect(split('/a^c/d私f//', false)).to.eql([ 'a^c', 'd私f' ])
    expect(split('//a^c/d私f//', false)).to.eql([ 'a^c', 'd私f' ])
    expect(split('a^c//d私f//', false)).to.eql([ 'a^c', 'd私f' ])
    expect(split('/a^c//d私f//', false)).to.eql([ 'a^c', 'd私f' ])
    expect(split('//a^c//d私f//', false)).to.eql([ 'a^c', 'd私f' ])
  })

  it('should not split non-strings', () => {
    expect(() => split()).to.throw(TypeError, 'Path must be a string')
    expect(() => split(123)).to.throw(TypeError, 'Path must be a string')
    expect(() => split(true)).to.throw(TypeError, 'Path must be a string')
  })
})
