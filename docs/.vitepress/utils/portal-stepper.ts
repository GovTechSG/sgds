type PortalStepperStep = {
  stepHeader: string;
  description?: string;
  iconName?: string;
  disabled?: boolean;
  completed?: boolean;
};

type PortalStepperElement = HTMLElement & {
  activeStep?: number;
  updateComplete?: Promise<unknown>;
};

type PortalStepElement = HTMLElement & {
  stepHeader?: string;
  iconName?: string;
  disabled?: boolean;
  completed?: boolean;
};

const portalStepperSteps: Record<string, PortalStepperStep[]> = {
  default: [
    { stepHeader: "Start", description: "Begin the application." },
    { stepHeader: "Review", description: "Check your details." },
    { stepHeader: "Confirm", description: "Submit and finish." },
  ],
  icons: [
    { stepHeader: "Start", description: "Begin the application.", iconName: "pencil" },
    { stepHeader: "Review", description: "Check your details.", iconName: "file-earmark-text" },
    { stepHeader: "Confirm", description: "Submit and finish.", iconName: "check" },
  ],
  "no-description": [
    { stepHeader: "Start" },
    { stepHeader: "Review" },
    { stepHeader: "Confirm" },
  ],
  disabled: [
    { stepHeader: "Start", description: "Begin the application." },
    { stepHeader: "Review", description: "Check your details." },
    { stepHeader: "Confirm", description: "Submit and finish.", disabled: true },
  ],
  completed: [
    { stepHeader: "Start", description: "Begin the application.", completed: true },
    { stepHeader: "Review", description: "Check your details.", completed: true },
    { stepHeader: "Confirm", description: "Submit and finish." },
  ],
  long: [
    { stepHeader: "Start", description: "Begin." },
    { stepHeader: "Profile", description: "Add profile." },
    { stepHeader: "Eligibility", description: "Check criteria." },
    { stepHeader: "Documents", description: "Upload files." },
    { stepHeader: "Review", description: "Check details." },
    { stepHeader: "Payment", description: "Make payment." },
    { stepHeader: "Submit", description: "Send form." },
    { stepHeader: "Confirm", description: "Finish." },
  ],
};

const getActiveStep = (el: HTMLElement) => {
  const value = Number(el.getAttribute("activeStep") ?? el.getAttribute("activestep") ?? el.dataset.portalActiveStep ?? 0);
  return Number.isFinite(value) ? value : 0;
};

const buildStep = (step: PortalStepperStep) => {
  const el = document.createElement("sgds-step") as PortalStepElement;
  el.stepHeader = step.stepHeader;
  el.setAttribute("stepHeader", step.stepHeader);

  if (step.iconName) {
    el.iconName = step.iconName;
    el.setAttribute("iconName", step.iconName);
  }

  if (step.disabled) {
    el.disabled = true;
    el.setAttribute("disabled", "");
  }

  if (step.completed) {
    el.completed = true;
    el.setAttribute("completed", "");
  }

  el.textContent = step.description ?? "";
  return el;
};

export const setupPortalSteppers = async (root: ParentNode | null | undefined) => {
  if (!root?.querySelector("sgds-stepper[data-portal-stepper]")) return;

  await customElements.whenDefined("sgds-stepper");
  await customElements.whenDefined("sgds-step");

  const steppers = Array.from(root.querySelectorAll<PortalStepperElement>("sgds-stepper[data-portal-stepper]"));

  for (const el of steppers) {
    const variant = el.dataset.portalStepper || "default";
    const steps = portalStepperSteps[variant] ?? portalStepperSteps.default;
    const signature = `${variant}:${steps.map((step) => `${step.stepHeader}:${step.description ?? ""}:${step.iconName ?? ""}:${step.disabled ?? false}:${step.completed ?? false}`).join("|")}`;

    if (el.dataset.portalStepperReady !== signature) {
      el.replaceChildren(...steps.map(buildStep));
      el.dataset.portalStepperReady = signature;
    }

    el.activeStep = getActiveStep(el);
    await el.updateComplete;
  }
};
