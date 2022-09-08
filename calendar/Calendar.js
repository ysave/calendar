import {addDays, getDayIndex} from "./helper.js";

export class Calendar{
    constructor() {
        this.weekStart = null
        this.weekEnd = null
        this.weekOffset = null

    }
    setup(){
        this.setupTimes()
        this.setupDays()
        this.calcCurrentWeek()
        this.showWeek()
        this.setupControls()
        this.showCurrentDay()
    }

    setupTimes(){
        const header = $("<div></div>").addClass("columnHeader")
        const slots = $("<div></div>").addClass("slots")
        for (let hour = 0; hour < 24; hour++) {
            $("<div></div>")
                .attr("data-hour",hour)
                .addClass("time")
                .text(`${hour}:00 - ${hour+1}:00`)
                .appendTo(slots)
        }
        $(".dayTime").append(header).append(slots)
    }

    setupDays(){
        const cal = this;
        $(".day").each(function () {
            const dayIndex = parseInt($(this).attr("data-dayIndex"))
            const name = $(this).attr("data-name");
            const header = $("<div></div>").addClass("columnHeader").text(name)
            $("<div></div>").addClass("dayDisplay").appendTo(header)
            const slots = $("<div></div>").addClass("slots")
            for (let hour = 0; hour < 24; hour++) {
                $("<div></div>")
                    .attr("data-hour", hour)
                    .addClass("slot")
                    .appendTo(slots)
                    .click(() => cal.clickSlot(hour, dayIndex))
                    .hover(
                        () => cal.hoverOver(hour),
                        () => cal.hoverOut()

                    )
            }
            $(this).append(header).append(slots)
        })
    }

    clickSlot(hour, dayIndex){
        console.log("click")
    }

    hoverOver(hour){
        $(`.time[data-hour=${hour}]`).addClass("currentTime")
    }

    hoverOut(){
        $(".time").removeClass("currentTime")
    }

    calcCurrentWeek(){
        const now = new Date()
        this.weekStart = addDays(now, -getDayIndex(now))
        this.weekEnd = addDays(this.weekStart, 6)
    }

    showWeek(){
        const settings = {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        }
        $("#weekStartDisplay").text(this.weekStart.toLocaleDateString(undefined, settings))
        $("#weekEndDisplay").text(this.weekEnd.toLocaleDateString(undefined, settings))
        for (let day = 0; day < 7; day++) {
            const date = addDays(this.weekStart, day)
            const display = date.toLocaleDateString(undefined,{
                month: "2-digit",
                day: "2-digit"
            })
            $(`.day[data-dayIndex=${day}] .dayDisplay`).text(display)
        }
        if(this.weekOffset == 0){
            this.showCurrentDay()
        } else {
            this.hideCurrentDay()
        }
    }

    setupControls(){
        $("#nextWeekBtn").click(() => this.changeWeek(1))
        $("#prevWeekBtn").click(() => this.changeWeek(-1))
    }

    changeWeek(number){
        this.weekOffset += number
        this.weekStart = addDays(this.weekStart, 7 * number)
        this.weekEnd = addDays(this.weekEnd, 7 * number)
        this.showWeek()
    }

    showCurrentDay(){
        const now = new Date()
        const dayIndex = getDayIndex(now)
        $(`.day[data-dayIndex=${dayIndex}]`).addClass("currentDay")
    }

    hideCurrentDay(){
        $(".day").removeClass("currentDay")
    }

}