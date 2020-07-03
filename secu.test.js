const crypto = require('./secu');

test('correct password', () => {
    expect(
        crypto("Ym9i.oijgG8HV/IzMIKRW4/sYvV+Ew1uiYBRe4XVJ8FnBC2Q=", "my salt")
        ).toBe(true);
});