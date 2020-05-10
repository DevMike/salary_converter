package main

import "github.com/gin-gonic/gin"
import "net/http"
import "strconv"
import "fmt"
import "math"

const WorkingDaysPerMonth = 21.5
const PercentsFactor = 100.0
const MonthsInYear = 12
const DefaultPaidExpenses = 50.0

var msq struct {
                ExpectedSalary float64
                VacationDaysCost float64
                ClearSalary float64
                ActualDailySalary float64
                ExpectedDailySalary float64
               }


func CORSMiddleware() gin.HandlerFunc {
     return func(c *gin.Context) {
         c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
         c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
     }
 }


func main() {
    router := gin.Default()
    router.Use(CORSMiddleware())
    // Setup route group for the API
    api := router.Group("/api")
    {
        api.GET("/calculate_salary", SalaryCalculator)
    }
	router.Run(":5000")
}


func SalaryCalculator(c *gin.Context) {
    vat_perc := parse_param_to_f(c.Query("vat_perc"))
    other_taxes := parse_param_to_f(c.Query("other_taxes"))
    vacation_days := parse_param_to_f(c.Query("vacation_days"))
    paid_expenses := calculate_paid_expenses(c.Query("paid_expenses"))

    if c.Query("office_salary") != "" {
        calculate_remote_salary(c.Query("office_salary"), vat_perc, other_taxes, paid_expenses, vacation_days)
    } else {
        calculate_office_salary(c.Query("remote_salary"), vat_perc, other_taxes, paid_expenses, vacation_days)
    }
//     msq.VacationDaysCost = vacation_days_equivalent * vacation_days
//     msq.ExpectedDailySalary = math.Round(msq.ExpectedSalary / WorkingDaysPerMonth)

    c.Header("Content-Type", "application/json")
    c.JSON(http.StatusOK, msq)
}

func calculate_paid_expenses(param string) float64 {
    if param == "" {
        return DefaultPaidExpenses
    } else {
        return parse_param_to_f(param)
    }
}

func vacation_money_factor(vacation_days float64, clear_salary float64) float64 {
    daily_salary := clear_salary / WorkingDaysPerMonth
    return daily_salary * vacation_days / MonthsInYear
}

func parse_param_to_f(param string) (parsed_param float64) {
    parsed_param, err := strconv.ParseFloat(param, 32)
    if err != nil {
        fmt.Println("An error occurred: %v", err)
    }
    return
}

func calculate_remote_salary(office_salary_param string, vat_perc, other_taxes, paid_expenses, vacation_days float64) {
    office_salary := parse_param_to_f(office_salary_param)
    msq.ActualDailySalary = office_salary / WorkingDaysPerMonth
    msq.ClearSalary = office_salary + office_salary * vat_perc / PercentsFactor + other_taxes + paid_expenses
    vacation_days_equivalent := vacation_money_factor(vacation_days, msq.ClearSalary)
    msq.ExpectedSalary = math.Round(msq.ClearSalary + vacation_days_equivalent)
}

func calculate_office_salary(remote_salary_param string, vat_perc, other_taxes, paid_expenses, vacation_days float64) {
    remote_salary := parse_param_to_f(remote_salary_param)
    msq.ActualDailySalary = remote_salary / WorkingDaysPerMonth
    msq.ClearSalary = remote_salary - other_taxes - remote_salary * vat_perc / PercentsFactor - paid_expenses
    vacation_days_equivalent := vacation_money_factor(vacation_days, msq.ClearSalary)
    msq.ExpectedSalary = math.Round(msq.ClearSalary - vacation_days_equivalent)
}
