namespace text {
    
    let anmt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    export function decEncode(nvl: number, bvl: number, dvl: number): string {
        let sti = ""
        let ani = nvl
        if (ani > 0) {
            while (ani > 0) {
                sti = "" + anmt.charAt(ani % bvl) + sti
                ani = Math.floor(ani / bvl)
            }
        } else {
            sti = anmt.charAt(0)
        }
        if (dvl <= 0) {
            return sti
        }
        if (dvl - sti.length > 0) {
            while (dvl - sti.length > 0) {
                sti = "" + anmt.charAt(0) + sti
            }
        }
        return sti
    }

    export function decDecode(tvl: string, bvl: number): number {
        let stl = tvl.length
        let vld = 0
        let nvl = 0
        let vix = 0
        for (let nix = stl - 1; nix >= 0; nix--) {
            vix = anmt.indexOf(tvl.charAt(nix))
            if (vld == 0) {
                nvl += vix
                vld = bvl
            } else {
                nvl += vix * vld
                vld = vld * bvl
            }
        }
        return nvl
    }

    //%blockid=text_charcodeidx
    //%block="text $_str char code at $_idx"
    //%group="better string"
    //%inlineInputMode=inline
    export function CharCodeAt(_str: string = "", _idx: number = 0) {
        return _str.charCodeAt(_idx)
    }

    //%blockid=text_charxor
    //%block=" xor $_ustr with key of $_kstr at $_idx"
    //%group="better string"
    //%inlineInputMode=inline
    export function CharXor(_idx: number = 0, _ustr: string = "", _kstr: string = "") {
        return String.fromCharCode(_ustr.charCodeAt(_idx % _ustr.length) ^ _kstr.charCodeAt(_idx % _kstr.length))
    }

    //%blockid=text_charcoderandom
    //%block="Pick Random char code $_min to $_max"
    //%group="better string"
    //%inlineInputMode=inline
    export function RandTxt(_min: number = 0, _max: number = 0) {
        return String.fromCharCode(randint(_min, _max))
    }

    //%blockid="text_baseencode"
    //%block="get base encode $_str with base level $_bval"
    //%group="better string"
    //%inlineInputMode=inline
    export function BaseEncode(_str: string = "", _bval: number = 0) {
        let _ustr = ""
        let _c = ""
        let _rbv = Math.max(((_bval - 1) % anmt.length), 9) + 1
        for (let _idx = 0; _idx < _str.length; _idx++) {
            _c = decEncode(_str.charCodeAt(_idx), _rbv, 0)
            _ustr = "" + _ustr + decEncode(_c.length, _rbv, 0) + _c
        }
        return _ustr
    }

    //%blockid=text_basedecode
    //%block="get base decode $_str with base level $_bval"
    //%group="better string"
    //%inlineInputMode=inline
    export function BaseDecode(_str: string = "", _bval: number = 0) {
        let _ustr = ""
        let _c = ""
        let _cv = ""
        let _cn = 0
        let _idx = 0
        let _rbv = Math.max(((_bval - 1) % anmt.length), 9) + 1
        for (let _idx = 0; _idx < _str.length; _idx++) {
            _cn = decDecode(_str.charAt(_idx), _rbv)
            _cv = ""
            for (let _i = 0; _i < _cn; _i++) {
                _cv = "" + _cv + _str.charAt(_idx + (_i + 1))
            }
            _idx += _cn
            _c = String.fromCharCode(decDecode(_cv, _rbv))
            _ustr = "" + _ustr + _c
        }
        return _ustr
    }

    //%blockid=text_chesarencode
    //%block="get chesar encode $_str with key $_kv"
    //%group="better string"
    //%inlineInputMode=inline
    export function ChesarEncode(_str: string = "", _kv: number = 0) {
        let _ustr = ""
        let _c = ""
        for (let _idx = 0; _idx < _str.length; _idx++) {
            _c = String.fromCharCode(_str.charCodeAt(_idx) + _kv)
            _ustr = "" + _ustr + _c
        }
        return _ustr
    }

    //%blockid=text_chesardecode
    //%block="get chesar decode $_str with key $_kv"
    //%group="better string"
    //%inlineInputMode=inline
    export function ChesarDecode(_str: string = "", _kv: number = 0) {
        let _ustr = ""
        let _c = ""
        for (let _idx = 0; _idx < _str.length; _idx++) {
            _c = String.fromCharCode(_str.charCodeAt(_idx) - _kv) 
            _ustr = "" + _ustr + _c
        }
        return _ustr
    }

    //%blockid=text_veginereencode
    //%block="get veginere encode $_str with key $_key"
    //%group="better string"
    //%inlineInputMode=inline
    export function VeginereEncode(_str: string = "", _key: string = "") {
        let _ustr = ""
        let _c = ""
        for (let _idx = 0; _idx < _str.length; _idx++) {
            _c = String.fromCharCode(_str.charCodeAt(_idx % _str.length) + _key.charCodeAt(_idx % _key.length))
            _ustr = "" + _ustr + _c
        }
        return _ustr
    }

    //%blockid=text_vegineredecode
    //%block="get veginere decode $_str with key $_key"
    //%group="better string"
    //%inlineInputMode=inline
    export function VeginereDecode(_str: string = "", _key: string = "") {
        let _ustr = ""
        let _c = ""
        for (let _idx = 0; _idx < _str.length; _idx++) {
            _c = String.fromCharCode(_str.charCodeAt(_idx % _str.length) - _key.charCodeAt(_idx % _key.length))
            _ustr = "" + _ustr + _c
        }
        return _ustr
    }
}
