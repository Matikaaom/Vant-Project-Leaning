import type { Moment } from "moment"
export function useBuddhistYear() {
    function toBuddhistYear(moment: Moment, format: string): string {
        var christianYear = moment.format('YYYY')
        var buddhishYear = (parseInt(christianYear) + 543).toString()
        return moment
            .format(format.replace('YYYY', buddhishYear).replace('YY', buddhishYear.substring(2, 4)))
            .replace(christianYear, buddhishYear)
    }
    return {
        toBuddhistYear
    }
}