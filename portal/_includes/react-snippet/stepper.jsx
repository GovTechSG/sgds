import SgdsStepper from "@govtechsg/sgds-web-component/react/stepper";
import { useMemo } from "react"

export const Stepper = () => {
    const steps = useMemo(() => [
        {
            stepHeader: "Personal Details",
            component: "1 test"
        },
        {
            stepHeader: "Address and Contact Information",
            component: "2 test"
        },
        {
            stepHeader: "Review",
            component: "3 test"
        }
    ], [])

    return <SgdsStepper steps={steps} activeStep={1} />
}
