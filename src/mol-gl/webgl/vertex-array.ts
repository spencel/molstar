/**
 * Copyright (c) 2018 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { Context } from './context';
import { Program } from './program';
import { AttributeBuffers, ElementsBuffer } from './buffer';

export function createVertexArray(ctx: Context, program: Program, attributeBuffers: AttributeBuffers, elementsBuffer?: ElementsBuffer) {
    const { vertexArrayObject } = ctx.extensions
    let vertexArray: WebGLVertexArrayObject | null = null
    if (vertexArrayObject) {
        vertexArray = vertexArrayObject.createVertexArray()
        vertexArrayObject.bindVertexArray(vertexArray)
        if (elementsBuffer) elementsBuffer.bind()
        program.bindAttributes(attributeBuffers)
        ctx.vaoCount += 1
        vertexArrayObject.bindVertexArray(null!)
    }
    return vertexArray
}

export function deleteVertexArray(ctx: Context, vertexArray: WebGLVertexArrayObject | null) {
    const { vertexArrayObject } = ctx.extensions
    if (vertexArrayObject && vertexArray) {
        vertexArrayObject.deleteVertexArray(vertexArray)
        ctx.vaoCount -= 1
    }
}