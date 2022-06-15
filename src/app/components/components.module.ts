import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CostCalculatorComponent } from "./cost-calculator/cost-calculator.component";

@NgModule({
    declarations: [
        CostCalculatorComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CostCalculatorComponent
    ]
})
export class ComponentsModule { }