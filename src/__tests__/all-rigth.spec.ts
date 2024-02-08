import Ssd from '../index'

describe('All opcodes:', () => {
    it('should decompile: regular opCodes', () => {
        const machineCode = '010000000000010000000000000201000000000000000301000000040100000005000000000600000000010000000700000000010000000800000000010000000900000000010000000a00000000010000000b00000000010000000c00000000010000000200000000010000000d000000000e00000000010000000200000000020000000600000000010000000f000000000100000002000000100100000012e400000011000000001400000000010000001500000000010000000200000016000000000100000017000000000100000018000000000100000025000000001afd0000001103000000020400000003000000040400000010040000001330040000000028'
        const code = '^declare a\n^declare b\n^declare c\n^declare teste_d\n^declare r0\n\nSET @a #0000000000000100\nSET @b $a\nCLR @b\nINC @b\nDEC @a\nADD @a $b\nSUB @a $b\nMUL @a $b\nDIV @a $b\nBOR @a $b\nAND @a $b\nXOR @a $b\nSET @a $b\nNOT @a\nSET @a $($b)\nSET @a $c\nADD @a $b\nSET @a $($b + $c)\nPSH $b\nJSR :function_28\nPOP @a\nSET @($a) $b\nSET @($a + $b) $c\nMOD @a $b\nSHL @a $b\nSHR @a $b\nSLP $a\nJMP :__fn_main\n\nfunction_28:\nPOP @teste_d\nSET @r0 $teste_d\nINC @r0\nPSH $r0\nRET\n\n\n__fn_main:\nPCS\nINC @a\nFIN\n'
        const Options = {
            machineCode,
            variables: ['a', 'b', 'c', 'teste_d', 'r0'],
            labels: [{ address: 253, label: '__fn_main' }],
            padInstruction: ''
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
    it('should decompile: opCodes for api functions', () => {
        const machineCode = '3222013310010000000034140100000000010000003527010000000037060400000000010000000200000028'
        const code = '^declare var00\n^declare var01\n^declare var02\n\nFUN clear_A_B\nFUN set_A1 $var00\nFUN set_A1_A2 $var00 $var01\nFUN @var00 check_A_equals_B\nFUN @var00 add_Minutes_to_Timestamp $var01 $var02\nFIN\n'
        const Options = {
            machineCode,
            padInstruction: ''
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
    it('should decompile: all api functions AT v2', () => {
        const machineCode = '3500010300000035010103000000350201030000003503010300000035040104000000350501040000003506010400000035070104000000331001050000003311010500000033120105000000331301050000003414010300000004000000341501030000000400000033160105000000331701050000003318010500000033190105000000341a010300000004000000341b010300000004000000322001322101322201322301322401352501030000003526010400000035270103000000322801322901322a01322b01322c01322d01322e013240013241013242013243013244013245013246013247013200023501020300000032020235030203000000320402350502030000003500030300000035010303000000350203030000003203033304030500000035050303000000350603030000003507030300000035080303000000320903320a03320b0335000403000000350104030000003302040500000032030432040432050437060403000000050000000600000028'
        const code = '^declare var00\n^declare var01\n^declare var02\n^declare var03\n^declare var04\n^declare var05\n^declare var06\n\nFUN @var03 get_A1\nFUN @var03 get_A2\nFUN @var03 get_A3\nFUN @var03 get_A4\nFUN @var04 get_B1\nFUN @var04 get_B2\nFUN @var04 get_B3\nFUN @var04 get_B4\nFUN set_A1 $var05\nFUN set_A2 $var05\nFUN set_A3 $var05\nFUN set_A4 $var05\nFUN set_A1_A2 $var03 $var04\nFUN set_A3_A4 $var03 $var04\nFUN set_B1 $var05\nFUN set_B2 $var05\nFUN set_B3 $var05\nFUN set_B4 $var05\nFUN set_B1_B2 $var03 $var04\nFUN set_B3_B4 $var03 $var04\nFUN clear_A\nFUN clear_B\nFUN clear_A_B\nFUN copy_A_From_B\nFUN copy_B_From_A\nFUN @var03 check_A_Is_Zero\nFUN @var04 check_B_Is_Zero\nFUN @var03 check_A_equals_B\nFUN swap_A_and_B\nFUN OR_A_with_B\nFUN OR_B_with_A\nFUN AND_A_with_B\nFUN AND_B_with_A\nFUN XOR_A_with_B\nFUN XOR_B_with_A\nFUN add_A_to_B\nFUN add_B_to_A\nFUN sub_A_from_B\nFUN sub_B_from_A\nFUN mul_A_by_B\nFUN mul_B_by_A\nFUN div_A_by_B\nFUN div_B_by_A\nFUN MD5_A_to_B\nFUN @var03 check_MD5_A_with_B\nFUN HASH160_A_to_B\nFUN @var03 check_HASH160_A_with_B\nFUN SHA256_A_to_B\nFUN @var03 check_SHA256_A_with_B\nFUN @var03 get_Block_Timestamp\nFUN @var03 get_Creation_Timestamp\nFUN @var03 get_Last_Block_Timestamp\nFUN put_Last_Block_Hash_In_A\nFUN A_to_Tx_after_Timestamp $var05\nFUN @var03 get_Type_for_Tx_in_A\nFUN @var03 get_Amount_for_Tx_in_A\nFUN @var03 get_Timestamp_for_Tx_in_A\nFUN @var03 get_Ticket_Id_for_Tx_in_A\nFUN message_from_Tx_in_A_to_B\nFUN B_to_Address_of_Tx_in_A\nFUN B_to_Address_of_Creator\nFUN @var03 get_Current_Balance\nFUN @var03 get_Previous_Balance\nFUN send_to_Address_in_B $var05\nFUN send_All_to_Address_in_B\nFUN send_Old_to_Address_in_B\nFUN send_A_to_Address_in_B\nFUN @var03 add_Minutes_to_Timestamp $var05 $var06\nFIN\n'
        const Options = {
            machineCode,
            padInstruction: ''
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
    it('should decompile: rare opCodes ', () => {
        const machineCode = '260000000027000000002b1600000004000000007f7f0500000000'
        const code = '^declare a\n\nFIZ $a\nSTZ $a\nERR :lab_6\nINC @a\nNOP\nNOP\nlab_6:\nDEC @a\n'
        const Options = {
            machineCode,
            variables: ['a']
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
    it('should decompile: all branches opCodes with positive offset (no overflow)', () => {
        const machineCode = '1b000000000b04010000001e000000000b04010000002200000000010000000f04010000002100000000010000000f04010000002000000000010000000f04010000001f00000000010000000f04010000002400000000010000000f04010000002300000000010000000f040100000028'
        const code = '^declare var00\n^declare var01\n\nBZR $var00 :lab_2\nINC @var01\nlab_2:\nBNZ $var00 :lab_4\nINC @var01\nlab_4:\nBLE $var00 $var01 :lab_6\nINC @var01\nlab_6:\nBGE $var00 $var01 :lab_8\nINC @var01\nlab_8:\nBLT $var00 $var01 :lab_10\nINC @var01\nlab_10:\nBGT $var00 $var01 :lab_12\nINC @var01\nlab_12:\nBNE $var00 $var01 :lab_14\nINC @var01\nlab_14:\nBEQ $var00 $var01 :lab_16\nINC @var01\nlab_16:\nFIN\n'
        const Options = {
            machineCode
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
    it('should decompile: all branches with negative offset (no overflow)', () => {
        const machineCode = '04000000001e00000000fb1b00000000f5230000000001000000ef240000000001000000e51f0000000001000000db200000000001000000d1210000000001000000c7220000000001000000bd040100000028'
        const code = '^declare var00\n^declare var01\n\nlab_0:\nINC @var00\nBNZ $var00 :lab_0\nBZR $var00 :lab_0\nBEQ $var00 $var01 :lab_0\nBNE $var00 $var01 :lab_0\nBGT $var00 $var01 :lab_0\nBLT $var00 $var01 :lab_0\nBGE $var00 $var01 :lab_0\nBLE $var00 $var01 :lab_0\nINC @var01\nFIN\n'
        const Options = {
            machineCode
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
    it('should decompile: branch opcode with max positive offset (127 bytes)', () => {
        const machineCode = '1b000000007f01000000000100000000000000010000000001000000000000000100000000010000000000000001000000000100000000000000010000000001000000000000000100000000010000000000000001000000000100000000000000010000000001000000000000000100000000010000000000000029292929040100000028'
        const code = '^declare a\n^declare b\n\nBZR $a :lab_14\nSET @a #0000000000000001\nSET @a #0000000000000001\nSET @a #0000000000000001\nSET @a #0000000000000001\nSET @a #0000000000000001\nSET @a #0000000000000001\nSET @a #0000000000000001\nSET @a #0000000000000001\nSET @a #0000000000000001\nSTP\nSTP\nSTP\nSTP\nlab_14:\nINC @b\nFIN\n'
        const Options = {
            machineCode,
            variables: ['a', 'b']
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
    it('should decompile: branch opcode with max negative offset (-128 bytes)', () => {
        const machineCode = '01000000000100000000000000010000000001000000000000000100000000010000000000000001000000000100000000000000010000000001000000000000000100000000010000000000000001000000000100000000000000010000000001000000000000000100000000010000000000000006000000000100000029291e0000000080040100000028'
        const code = '^declare a\n^declare b\n\nlab_0:\nSET @a #0000000000000001\nSET @a #0000000000000001\nSET @a #0000000000000001\nSET @a #0000000000000001\nSET @a #0000000000000001\nSET @a #0000000000000001\nSET @a #0000000000000001\nSET @a #0000000000000001\nSET @a #0000000000000001\nADD @a $b\nSTP\nSTP\nBNZ $a :lab_0\nINC @b\nFIN\n'
        const Options = {
            machineCode,
            variables: ['a', 'b']
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
    it('should decompile: code bytes from block explorer', () => {
        const machineCode = '13000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        const code = 'RET\n'
        const Options = {
            machineCode
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
    it('should decompile: new opcodes from SIP-37', () => {
        const machineCode = '0203000000040000001903000000050000002a0200000000030000002c000000000400000005000000020300000000000000250700000028'
        const code = '^declare r0\n^declare r1\n^declare r2\n^declare a\n^declare b\n^declare c\n^declare d\n^declare e\n\nSET @a $b\nPOW @a $c\nSLP\nSET @r0 $a\nMDV @r0 $b $c\nSET @a $r0\nSLP $e\nFIN\n'
        const Options = {
            machineCode,
            variables: ['r0', 'r1', 'r2', 'a', 'b', 'c', 'd', 'e']
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
    it('should decompile: new api codes from SIP-37', () => {
        const machineCode = '35060200000000350c0300000000350d0400000000320e0428'
        const code = '^declare v0\n\nFUN @v0 Check_Sig_B_With_A\nFUN @v0 Get_Code_Hash_Id\nFUN @v0 Get_Activation_Fee\nFUN Put_Last_Block_GSig_In_A\nFIN\n'
        const Options = {
            machineCode,
            variables: ['v0']
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
    it('should decompile: new api codes from SIP-38', () => {
        const machineCode = '3208043507040000000028'
        const code = '^declare var00\n\nFUN Set_Map_Value_Keys_In_A\nFUN @var00 Get_Map_Value_Keys_In_A\nFIN\n'
        const Options = {
            machineCode
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
})

describe('Parse creation bytes:', () => {
    it('should decompile: simple', () => {
        const creationBytes = '0200000001000000010000000000000000000000011300'
        const code = '^program activationAmount 0\n\nRET\n'
        const Options = {
            creationBytes
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
    it('should decompile: overflow on codeLenght and dataLength', () => {
        const creationBytes = '03000000010001000000000080f0fa0200000000000403000000010300000005000000000000000103000000050000000000000001030000000500000000000000010300000005000000000000000103000000050000000000000001030000000500000000000000010300000005000000000000000103000000050000000000000001030000000500000000000000010300000005000000000000000103000000050000000000000001030000000500000000000000010300000005000000000000000103000000050000000000000001030000000500000000000000010300000005000000000000000103000000050000000000000001030000000500000000000000010300000005000000000000007f7f7f280011121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff11121314151617ff21222324252627ff'
        const code = '^program activationAmount 50000000\n\n^declare var00\n^declare var01\n^declare var02\n^declare var03\n^declare var04\n^declare var05\n^declare var06\n^declare var07\n^declare var08\n^declare var09\n^declare var10\n^declare var11\n^declare var12\n^declare var13\n^declare var14\n^declare var15\n^declare var16\n^declare var17\n^declare var18\n^declare var19\n^declare var20\n^declare var21\n^declare var22\n^declare var23\n^declare var24\n^declare var25\n^declare var26\n^declare var27\n^declare var28\n^declare var29\n^declare var30\n^declare var31\n\n^const SET @var00 #ff17161514131211\n^const SET @var01 #ff17161514131211\n^const SET @var02 #ff17161514131211\n^const SET @var03 #ff17161514131211\n^const SET @var04 #ff17161514131211\n^const SET @var05 #ff17161514131211\n^const SET @var06 #ff17161514131211\n^const SET @var07 #ff17161514131211\n^const SET @var08 #ff17161514131211\n^const SET @var09 #ff17161514131211\n^const SET @var10 #ff17161514131211\n^const SET @var11 #ff17161514131211\n^const SET @var12 #ff17161514131211\n^const SET @var13 #ff17161514131211\n^const SET @var14 #ff17161514131211\n^const SET @var15 #ff17161514131211\n^const SET @var16 #ff17161514131211\n^const SET @var17 #ff17161514131211\n^const SET @var18 #ff17161514131211\n^const SET @var19 #ff17161514131211\n^const SET @var20 #ff17161514131211\n^const SET @var21 #ff17161514131211\n^const SET @var22 #ff17161514131211\n^const SET @var23 #ff17161514131211\n^const SET @var24 #ff17161514131211\n^const SET @var25 #ff17161514131211\n^const SET @var26 #ff17161514131211\n^const SET @var27 #ff17161514131211\n^const SET @var28 #ff17161514131211\n^const SET @var29 #ff17161514131211\n^const SET @var30 #ff17161514131211\n^const SET @var31 #ff27262524232221\n\nINC @var03\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nSET @var03 #0000000000000005\nNOP\nNOP\nNOP\nFIN\n'
        const Options = {
            creationBytes
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
    it('should decompile: two code pages and two data pages', () => {
        const creationBytes = '02000000020002000000000080f0fa020000000039010103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff000000000000000103000000ff0000000000000028280000000000000000000000000000000000000000000000000000000000000000000500000000000000'
        const code = '^program activationAmount 50000000\n\n^declare var00\n^declare var01\n^declare var02\n^declare var03\n^declare var04\n\n^const SET @var04 #0000000000000005\n\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nSET @var03 #00000000000000ff\nFIN\n'
        const Options = {
            creationBytes
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
    it('should decompile: more user stack pages and code stack pages', () => {
        const creationBytes = '03000000010001000200020080f0fa02000000003a0103000000050000000000000001030000000600000000000000010000000001000000000000002500000000010300000007000000000000002800'
        const code = '^program activationAmount 50000000\n^program codeStackPages 2\n^program userStackPages 2\n\n^declare var00\n^declare var01\n^declare var02\n^declare var03\n\nSET @var03 #0000000000000005\nSET @var03 #0000000000000006\nSET @var00 #0000000000000001\nSLP $var00\nSET @var03 #0000000000000007\nFIN\n'
        const Options = {
            creationBytes
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
})

describe('Parse attachment bytes:', () => {
    it('should decompile: simple', () => {
        const attachmentBytes = '011144656164536D617274436F6E74726163746A00546869732069732061206465616420736D61727420636F6E74726163742E20416E792062616C616E63652073656E7420746F207468697320616464726573732077696C6C20626520696E636C7564656420617320666565206F6E20746865206E65787420626C6F636B2E0200000001000000010000000000000000000000011300'
        const code = '^program name DeadSmartContract\n^program description This is a dead smart contract. Any balance sent to this address will be included as fee on the next block.\n^program activationAmount 0\n\nRET\n'
        const Options = {
            attachmentBytes
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
    it('should decompile: utf8 description', () => {
        const attachmentBytes = '01075554467465737426004174c3a920e4b8ade58d8ee4babae6b091e585b1e5928ce59bbd20efbc83efbc9e20f09fa88103000000010001000000000080f0fa0200000000012800'
        const code = '^program name UTFtest\n^program description Até 中华人民共和国 ＃＞ 🨁\n^program activationAmount 50000000\n\nFIN\n'
        const Options = {
            attachmentBytes
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })

    it('should decompile: Carbon copy contract', () => {
        const attachmentBytes = '01084e465453524334304b007b2276657273696f6e223a312c2264657363726970746f72223a22516d6436454639417255726e364e79744634696172396135696b67544a71465a34667567356a6a70437542754631227d02000000000002000100010080c3c9010000000000d8006dc7150ddb4cb2bc010000000000000000743ba40b0000005714bbc7aeeee27b140000000000000032000000000000006dc7150ddb4cb2bc7f5158d895cdf9cf635ddd6dc5fb45b2db00a2261f9625285d6e31f2c7a6fa4ab998f22771ac710ae5c2ab19bf16f313b0b755338a886ccec81c2396fdf26bc66f17199814c7e73775f214a39fc924119e711383d1b25ccb000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        const code = '^program name NFTSRC40\n^program description {"version":1,"descriptor":"Qmd6EF9ArUrn6NytF4iar9a5ikgTJqFZ4fug5jjpCuBuF1"}\n^program activationAmount 30000000\n\n^declare var00\n^declare var01\n^declare var02\n^declare var03\n^declare var04\n^declare var05\n^declare var06\n^declare var07\n^declare var08\n^declare var09\n^declare var10\n^declare var11\n^declare var12\n^declare var13\n^declare var14\n^declare var15\n^declare var16\n^declare var17\n\n^const SET @var00 #bcb24cdb0d15c76d\n^const SET @var01 #0000000000000001\n^const SET @var02 #0000000ba43b7400\n^const SET @var03 #7be2eeaec7bb1457\n^const SET @var04 #0000000000000014\n^const SET @var05 #0000000000000032\n^const SET @var06 #bcb24cdb0d15c76d\n^const SET @var07 #cff9cd95d858517f\n^const SET @var08 #b245fbc56ddd5d63\n^const SET @var09 #2825961f26a200db\n^const SET @var10 #4afaa6c7f2316e5d\n^const SET @var11 #0a71ac7127f298b9\n^const SET @var12 #13f316bf19abc2e5\n^const SET @var13 #ce6c888a3355b7b0\n^const SET @var14 #c66bf2fd96231cc8\n^const SET @var15 #37e7c7149819176f\n^const SET @var16 #1124c99fa314f275\n^const SET @var17 #cb5cb2d18313719e\n\n^comment This is a carbon copy contract. Decompile original deployment to get the code.\n'
        const Options = {
            attachmentBytes
        }
        const result = new Ssd(Options).decompile()
        expect(result.assemblyProgram).toBe(code)
    })
})
