import Ssd from '../index'

describe('Code bytes:', () => {
    test('should throw: Nothing to decompile', () => {
        expect(() => {
            new Ssd({}).decompile()
        }).toThrowError()
    })
    test('should throw: missing char', () => {
        expect(() => {
            const machineCode = '260000000027000000002b1600000004000000007f7f050000000'
            const Options = {
                machineCode
            }
            new Ssd(Options).decompile()
        }).toThrowError()
    })
    test('should throw: invalid char', () => {
        expect(() => {
            const machineCode = '260000000027000000002b1600000004000000007f7f050000000x'
            const Options = {
                machineCode
            }
            new Ssd(Options).decompile()
        }).toThrowError()
    })
    test('should throw: invalid opcode', () => {
        expect(() => {
            const machineCode = '99'
            const Options = {
                machineCode
            }
            new Ssd(Options).decompile()
        }).toThrowError()
    })
    test('should throw: Variable outside limits', () => {
        expect(() => {
            const machineCode = '0103030000050000000000000028'
            const Options = {
                machineCode
            }
            new Ssd(Options).decompile()
        }).toThrowError()
    })
    test('should throw: Jump to nowhere', () => {
        expect(() => {
            const machineCode = '1b03000000730103000000050000000000000001030000000f0000000000000028'
            const Options = {
                machineCode
            }
            new Ssd(Options).decompile()
        }).toThrowError()
    })
    test('should throw: Invalid labels object', () => {
        expect(() => {
            const machineCode = '010000000000010000000000000201000000000000000301000000040100000005000000000600000000010000000700000000010000000800000000010000000900000000010000000a00000000010000000b00000000010000000c00000000010000000200000000010000000d000000000e00000000010000000200000000020000000600000000010000000f000000000100000002000000100100000012e400000011000000001400000000010000001500000000010000000200000016000000000100000017000000000100000018000000000100000025000000001afd0000001103000000020400000003000000040400000010040000001330040000000028'
            const Options = {
                machineCode,
                variables: ['a', 'b', 'c', 'teste_d', 'r0'],
                labels: [{ address: 2053, label: '__fn_main' }],
                padInstruction: ''
            }
            new Ssd(Options).decompile()
        }).toThrowError()
    })
    test('should throw: Invalid api function number', () => {
        expect(() => {
            const machineCode = '322205'
            const Options = {
                machineCode,
                variables: ['a', 'b', 'c', 'teste_d', 'r0'],
                labels: [{ address: 2053, label: '__fn_main' }],
                padInstruction: ''
            }
            new Ssd(Options).decompile()
        }).toThrowError()
    })
})

describe('Creation bytes:', () => {
    test('should throw: invalid code byte size', () => {
        expect(() => {
            const creationBytes = '03000000010001000200020080f0fa02000000003a01030000000500000000000000010300000006000000000000000100000000010000000000000025000000000103000000070000000000'
            const Options = {
                creationBytes
            }
            new Ssd(Options).decompile()
        }).toThrowError()
    })
    test('should throw: invalid data byte size', () => {
        expect(() => {
            const creationBytes = '02000000020002000000000080f0fa020000000039010103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000002828000000000000000000000000000000000000000000000000000000000000000000'
            const Options = {
                creationBytes
            }
            new Ssd(Options).decompile()
        }).toThrowError()
    })
    test('should throw: invalid creation byte size', () => {
        expect(() => {
            const creationBytes = '02000000020002000000000080f0fa020000000039010103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff00000000000000282800000000000000000000000000000000000000000000000000000000000000000005000000000000000500000000000000'
            const Options = {
                creationBytes
            }
            new Ssd(Options).decompile()
        }).toThrowError()
    })
})

describe('Attachment bytes:', () => {
    test('should throw: invalid attachment type', () => {
        expect(() => {
            const attachmentBytes = '051144656164536D617274436F6E74726163746A00546869732069732061206465616420736D61727420636F6E74726163742E20416E792062616C616E63652073656E7420746F207468697320616464726573732077696C6C20626520696E636C7564656420617320666565206F6E20746865206E65787420626C6F636B2E0200000001000000010000000000000000000000011300'
            const Options = {
                attachmentBytes
            }
            new Ssd(Options).decompile()
        }).toThrowError()
    })
})
