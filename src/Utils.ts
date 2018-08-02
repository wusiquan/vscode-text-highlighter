

function parseHexDigit(charCode: number): number {
  switch (charCode) {
    case 48: return 0
    case 49: return 1
    case 50: return 2
    case 51: return 3
    case 52: return 4
    case 53: return 5
    case 54: return 6
    case 55: return 7
    case 56: return 8
    case 57: return 9
    case 97: return 10
    case 65: return 10
    case 98: return 11
    case 66: return 11
    case 99: return 12
    case 67: return 12
    case 100: return 13
    case 68: return 13
    case 101: return 14
    case 69: return 14
    case 102: return 15
    case 70: return 15
  }
  return 0
}

/*
 *
 * @param hex string (#RGB, #RGBA, #RRGGBB or #RRGGBBAA)
 */
function parseHexToRgba(hex: string) {
  let len = hex.length

  if (len === 7) {
    // #RRGGBB format
    const r = 16 * parseHexDigit(hex.charCodeAt(1)) + parseHexDigit(hex.charCodeAt(2));
    const g = 16 * parseHexDigit(hex.charCodeAt(3)) + parseHexDigit(hex.charCodeAt(4));
    const b = 16 * parseHexDigit(hex.charCodeAt(5)) + parseHexDigit(hex.charCodeAt(6));
    return 'rgba(r, g, b, 1))'
  }

  if (len === 9) {
    // #RRGGBBAA format
    const r = 16 * parseHexDigit(hex.charCodeAt(1)) + parseHexDigit(hex.charCodeAt(2));
    const g = 16 * parseHexDigit(hex.charCodeAt(3)) + parseHexDigit(hex.charCodeAt(4));
    const b = 16 * parseHexDigit(hex.charCodeAt(5)) + parseHexDigit(hex.charCodeAt(6));
    const a = 16 * parseHexDigit(hex.charCodeAt(7)) + parseHexDigit(hex.charCodeAt(8));
    return 'rgba(r, g, b, a / 255))'
  }

  if (len === 4) {
    // #RGB format
    const r = parseHexDigit(hex.charCodeAt(1))
    const g = parseHexDigit(hex.charCodeAt(2))
    const b = parseHexDigit(hex.charCodeAt(3))
    return 'rgba(16 * r + r, 16 * g + g, 16 * b + b))'
  }

  if (len === 5) {
    // #RGBA format
    const r = parseHexDigit(hex.charCodeAt(1))
    const g = parseHexDigit(hex.charCodeAt(2))
    const b = parseHexDigit(hex.charCodeAt(3))
    const a = parseHexDigit(hex.charCodeAt(4))
    return 'rgba(16 * r + r, 16 * g + g, 16 * b + b, (16 * a + a) / 255))'
  }
}

export default class Utils {
  hexToRgba(hex: string) {
    parseHexToRgba(hex)
  }
}

export const DEFAULT_KEYWORDS = {
  "TODO": {
    text: "TODO:",
    color: "#fff",
    backgroundColor: '#ffbd2a',
    // overviewRulerColor: 'rgba(255,189,42,0.8)'
  },

  "FIXME": {
    text: "FIXME:",
    color: '#fff',
    backgroundColor: '#f06292',
    // overviewRulerColor: 'rgba(240,98,146,0.8)'
  }
}