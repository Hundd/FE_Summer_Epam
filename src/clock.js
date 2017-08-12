function clock(hours, minutes) {
    if (
        hours < 1 ||
        hours > 12 ||
        minutes < 0 ||
        minutes > 60
    ) {
        return false;
    }
    var degInMinute = 360 / 60;
    var degInHour = 360 / 12;
    var degInHourPerMinute = degInHour / 60;
    var degMinutes = minutes * degInMinute;
    var degHours = hours * degInHour + degInHourPerMinute * minutes;
    // console.log(degMinutes, degHours)
    var angle = Math.abs(degMinutes - degHours);
    return angle < 180 ? angle : (360 - angle);
}