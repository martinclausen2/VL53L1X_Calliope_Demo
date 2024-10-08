let reading = 0
let Entfernung = 0
serial.redirectToUSB()
VL53L1X.init()
VL53L1X.setDistanceMode(VL53L1X.DistanceMode.Medium)
VL53L1X.setMeasurementTimingBudget(80000)
matrix.init(matrix.ePages.y64)
basic.forever(function () {
	
})
loops.everyInterval(100, function () {
    Entfernung = VL53L1X.readSingle()
    reading += 1
    matrix.writeDigits(6, 0, matrix.formatText(Entfernung, 4, matrix.eAlign.rechts), 16, 0, matrix.eTransparent.u, matrix.matrix_eFaktor(matrix.eFaktor.f2), matrix.matrix_eFaktor(matrix.eFaktor.f2))
    if (3840 > Entfernung) {
        matrix.line(reading, 0, reading, 64, false)
        matrix.line(reading, 0, reading, Entfernung / 80)
    }
    matrix.displayMatrix()
    if (127 < reading) {
        reading = 0
    }
    serial.writeString(VL53L1X.stringDistance())
})
