"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var index_1 = require("./index");
var roomTemplate = new index_1.Room({
    name: 'Cool Suite',
    bookings: [],
    rate: 100,
    discount: 10
});
var bookingTemplate = new index_1.Booking({
    name: "Chiquito",
    email: "gromenaur@jarl.com",
    checkIn: "2021-04-01",
    checkOut: "2021-04-05",
    discount: 20,
    room: roomTemplate
});
var bookingTemplate2 = new index_1.Booking({
    name: "Chiquito",
    email: "gromenaur@jarl.com",
    checkIn: "2021-04-10",
    checkOut: "2021-04-15",
    discount: 20,
    room: roomTemplate
});
describe("Room", function () {
    test('is not occupied', function () {
        var booking1 = new index_1.Booking(__assign({}, bookingTemplate));
        var room1 = new index_1.Room(__assign(__assign({}, roomTemplate), { bookings: [booking1] }));
        expect(room1.isOccupied("2021-04-25")).toBe(false);
    });
    test('is occupied', function () {
        var booking1 = new index_1.Booking(__assign({}, bookingTemplate));
        var room1 = new index_1.Room(__assign(__assign({}, roomTemplate), { bookings: [booking1] }));
        expect(room1.isOccupied("2021-04-04")).toBe('Chiquito');
    });
    test('occupancy', function () {
        var room1 = new index_1.Room(__assign(__assign({}, roomTemplate), { bookings: [bookingTemplate, bookingTemplate2] }));
        expect(room1.occupancyPercentage('2021-04-01', '2021-04-05')).toBe(100);
    });
    test('total occupancy percentage', function () {
        var room1 = new index_1.Room(__assign({}, roomTemplate));
        var room2 = new index_1.Room(__assign(__assign({}, roomTemplate), { name: 'Better suite' }));
        var booking1 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { room: room1 }));
        var booking2 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { checkIn: '2021-04-05', checkOut: '2021-04-10', room: room1 }));
        var booking3 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { checkIn: '2021-04-15', checkOut: '2021-04-30', room: room1 }));
        var booking4 = new index_1.Booking(__assign(__assign({}, bookingTemplate2), { room: room2 }));
        var booking5 = new index_1.Booking(__assign(__assign({}, bookingTemplate2), { checkIn: '2021-05-01', checkOut: '2021-05-02', room: room2 }));
        var booking6 = new index_1.Booking(__assign(__assign({}, bookingTemplate2), { checkIn: '2021-05-18', checkOut: '2021-05-20', room: room2 }));
        room1 = __assign(__assign({}, room1), { bookings: [booking1, booking2, booking3] });
        room2 = __assign(__assign({}, room2), { bookings: [booking4, booking5, booking6] });
        var rooms = [room1, room2];
        expect(index_1.Room.totalOccupancyPercentage(rooms, '2021-04-01', '2021-04-30')).toBe(100);
    });
    test('is available', function () {
        var room1 = new index_1.Room(__assign({}, roomTemplate));
        var room2 = new index_1.Room(__assign(__assign({}, roomTemplate), { name: 'Better suite' }));
        var booking1 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { room: room1 }));
        var booking2 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { checkIn: '2021-04-05', checkOut: '2021-04-10', room: room1 }));
        var booking3 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { checkIn: '2021-04-20', checkOut: '2021-04-22', room: room1 }));
        var booking4 = new index_1.Booking(__assign(__assign({}, bookingTemplate2), { checkIn: '2021-05-01', checkOut: '2021-05-05', room: room2 }));
        var booking5 = new index_1.Booking(__assign(__assign({}, bookingTemplate2), { checkIn: '2021-05-05', checkOut: '2021-05-10', room: room2 }));
        var booking6 = new index_1.Booking(__assign(__assign({}, bookingTemplate2), { checkIn: '2021-05-20', checkOut: '2021-05-22', room: room2 }));
        room1 = __assign(__assign({}, room1), { bookings: [booking1, booking2, booking3] });
        room2 = __assign(__assign({}, room2), { bookings: [booking4, booking5, booking6] });
        var rooms = [room1, room2];
        expect(index_1.Room.availableRooms(rooms, '2021-05-20', '2021-05-22'));
    });
    test('is available', function () {
        var room1 = new index_1.Room(__assign({}, roomTemplate));
        var room2 = new index_1.Room(__assign(__assign({}, roomTemplate), { name: 'Better suite' }));
        var booking1 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { room: room1 }));
        var booking2 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { checkIn: '2021-04-05', checkOut: '2021-04-10', room: room1 }));
        var booking3 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { checkIn: '2021-04-20', checkOut: '2021-04-22', room: room1 }));
        var booking4 = new index_1.Booking(__assign(__assign({}, bookingTemplate2), { checkIn: '2021-05-01', checkOut: '2021-05-05', room: room2 }));
        var booking5 = new index_1.Booking(__assign(__assign({}, bookingTemplate2), { checkIn: '2021-05-05', checkOut: '2021-05-10', room: room2 }));
        var booking6 = new index_1.Booking(__assign(__assign({}, bookingTemplate2), { checkIn: '2021-05-20', checkOut: '2021-05-22', room: room2 }));
        room1 = __assign(__assign({}, room1), { bookings: [booking1, booking2, booking3] });
        room2 = __assign(__assign({}, room2), { bookings: [booking4, booking5, booking6] });
        var rooms = [room1, room2];
        expect(index_1.Room.availableRooms(rooms, '2021-06-05', '2021-06-08'));
    });
});
describe('Booking', function () {
    test('fee discounts included', function () {
        var booking1 = new index_1.Booking(__assign({}, bookingTemplate));
        var room1 = new index_1.Room(__assign(__assign({}, roomTemplate), { bookings: [booking1] }));
        booking1 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { room: room1 }));
        expect(booking1.getFee()).toBe(280);
    });
    test('fee 0 discounts included', function () {
        var booking1 = new index_1.Booking(__assign({}, bookingTemplate));
        var room1 = new index_1.Room(__assign(__assign({}, roomTemplate), { discount: 0, bookings: [booking1] }));
        booking1 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { room: room1, discount: 0 }));
        expect(booking1.getFee()).toBe(400);
    });
    test('fee 100 discounts included', function () {
        var booking1 = new index_1.Booking(__assign({}, bookingTemplate));
        var room1 = new index_1.Room(__assign(__assign({}, roomTemplate), { discount: 60, bookings: [booking1] }));
        booking1 = new index_1.Booking(__assign(__assign({}, bookingTemplate), { room: room1, discount: 60 }));
        expect(booking1.getFee()).toBe(0);
    });
});
