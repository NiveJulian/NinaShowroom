import React from "react";

const steps = [
  { label: "Contacto", icon: "📝" }, // Puedes reemplazar estos emojis con íconos reales
  { label: "Envio", icon: "📦" },
  { label: "Forma Pago", icon: "💲" },
  { label: "Entregado", icon: "✅" },
];

const ProgressSteps = ({ currentStep }) => {
  return (
    <div className="flex items-center">
      {steps.map((step, index) => {
        const isActive = index <= currentStep;
        const isCompleted = index < currentStep; // Step has been completed
        
        return (
          <React.Fragment key={index}>
            <div
              className={`flex flex-col justify-center items-center transition-all duration-400 ${
                isActive ? "text-teal-500" : "text-gray-400"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-400 border-2 ${
                  isActive ? "border-teal-500" : "border-gray-400"
                }`}
              >
                {step.icon}
              </div>
              <span className="mt-2 text-sm font-semibold">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-grow h-1 bg-gray-200 transition-all ease-linear duration-800 ${
                  isCompleted ? "bg-teal-500" : ""
                }`}
                style={{
                  transitionDelay: isCompleted ? `${index * 0.3}s` : "0s",
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressSteps;
