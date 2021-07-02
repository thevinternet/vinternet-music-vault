//===============================================================================================================//

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

//===============================================================================================================//

export const labelCreator = string => {
  const label = string.split(/(?=[A-Z])/).join(" ");
  return label[0].toUpperCase() + label.substring(1);
};

//===============================================================================================================//

export const displayToggle = event => {
  const targetElement = event.target.nextElementSibling;
  if (targetElement.classList.contains("visually-hidden")) {
    targetElement.classList.remove("visually-hidden");
    event.target.className="open";
  } else {
    targetElement.classList.add("visually-hidden");
    event.target.className="closed";
  }
}

//===============================================================================================================//
