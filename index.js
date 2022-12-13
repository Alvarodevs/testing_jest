var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Room = /** @class */ (function () {
    function Room(room) {
        this.name = room.name;
        this.bookings = room.bookings;
        this.rate = room.rate;
        this.discount = room.discount;
    }
    //create range of date to map
    Room.prototype.rangeDates = function (start, end) {
        var range = [];
        var startDate = new Date(start);
        var endDate = new Date(end);
        while (startDate <= endDate) {
            range = __spreadArray(__spreadArray([], range, true), [startDate.toISOString().slice(0, 10)], false);
            startDate.setDate(startDate.getDate() + 1);
        }
        return range;
    };
    //bool returns id or false if occupied in date provided as param
    Room.prototype.isOccupied = function (date) {
        var currentDate = new Date(date);
        var name;
        this.bookings.forEach(function (b) {
            var checkIn = new Date(b.checkIn);
            var checkOut = new Date(b.checkOut);
            if (checkIn <= currentDate && checkOut >= currentDate) {
                name = b.name;
            }
        });
        return name ? name : false;
    };
    Room.prototype.occupancyPercentage = function (start, end) {
        var _this = this;
        var range = this.rangeDates(start, end);
        var numOccupied = 0;
        range.forEach(function (date) {
            if (_this.isOccupied(date) !== false) {
                return (numOccupied += 1);
            }
        });
        var totalPercentage = (numOccupied * 100) / range.length;
        return totalPercentage;
    };
    Room.totalOccupancyPercentage = function (rooms, startRange, endRange) {
        var totalRange = 0;
        var daysBooked = 0;
        rooms.forEach(function (room) {
            room.bookings &&
                room.bookings.forEach(function (booking) {
                    var dateNumber = function (date) {
                        return new Date(date).getTime();
                    };
                    totalRange = dateNumber(endRange) - dateNumber(startRange);
                    if (dateNumber(booking.checkIn) >= dateNumber(startRange) &&
                        dateNumber(booking.checkOut) <= dateNumber(endRange)) {
                        daysBooked +=
                            dateNumber(booking.checkOut) - dateNumber(booking.checkIn);
                    }
                });
        });
        return ((new Date(daysBooked).getDate() * 100) / new Date(totalRange).getDate());
    };
    Room.availableRooms = function (rooms, startDate, endDate) {
        //const range = this.prototype.rangeDates(startDate, endDate) Static method call to non-static
        var availableRooms = [];
        rooms.forEach(function (room) {
            if (roomAvailable(room, startDate, endDate)) {
                availableRooms = __spreadArray(__spreadArray([], availableRooms, true), [room], false);
            }
        });
        return availableRooms;
    };
    return Room;
}());
//BOOKING
var Booking = /** @class */ (function () {
    function Booking(booking) {
        this.name = booking.name;
        this.email = booking.email;
        this.checkIn = booking.checkIn;
        this.checkOut = booking.checkOut;
        this.discount = booking.discount;
        this.room = booking.room;
    }
    Booking.prototype.getFee = function () {
        var totalDiscount = this.discount + this.room.discount >= 100
            ? 100
            : this.discount + this.room.discount;
        var dateRange = this.room.rangeDates(this.checkIn, this.checkOut);
        var totalPrice = (dateRange.length - 1) * this.room.rate;
        var priceWithDiscount = totalPrice - (totalDiscount / 100) * totalPrice;
        return priceWithDiscount;
    };
    return Booking;
}());
function roomAvailable(room, startDate, endDate) {
    room.bookings.forEach(function (booking) {
        if (new Date(booking.checkIn).getDate() >= new Date(startDate).getDate() &&
            new Date(booking.checkOut).getDate() < new Date(endDate).getDate()) {
            return false;
        }
    });
    return true;
}
