import React, { useState, useEffect } from "react";
import "./PrescriptionSettingForm.css";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaGripVertical,
  FaArrowLeft,
} from "react-icons/fa";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function PrescriptionSettingForm() {

  /*----------------------------------------------------------
      LEFT SIDE DATA
  -----------------------------------------------------------*/

  const defaultLeftSections = [
    {
      id: "investigation",
      title: "Investigations Required",
      items: [
        {
          id: Date.now() + 1,
          name: "Cervical Spine AP/Lat View",
          charges: "",
          type: "Essential",
        },
        {
          id: Date.now() + 2,
          name: "Lumbar Spine AP/Lat View",
          charges: "",
          type: "Advanced",
        },
      ],
    },

    {
      id: "pathology",
      title: "Pathology",
      items: [
        {
          id: Date.now() + 3,
          name: "CBC",
          charges: "",
          type: "Essential",
        },
        {
          id: Date.now() + 4,
          name: "ESR",
          charges: "",
          type: "Essential",
        },
      ],
    },
  ];

  /*----------------------------------------------------------
      RIGHT SIDE DATA
  -----------------------------------------------------------*/

  const defaultTreatmentSections = [

    {
      id: "standard",
      title: "Standard Treatment Modalities",
      items: [
        {
          id: Date.now() + 11,
          name: "Thermotherapy Hot / Cold",
          charges: "",
          type: "Essential",
        },
        {
          id: Date.now() + 12,
          name: "Therapeutic Ultrasound",
          charges: "",
          type: "Essential",
        },
      ],
    },

    {
      id: "advance",
      title: "Advance Treatment Modalities",
      items: [
        {
          id: Date.now() + 21,
          name: "PEMF",
          charges: "",
          type: "Advanced",
        },
      ],
    },

    {
      id: "therapy",
      title: "Therapeutic Services",
      items: [
        {
          id: Date.now() + 31,
          name: "ROM Exercises",
          charges: "",
          type: "Both",
        },
      ],
    },

    {
      id: "addon",
      title: "Additional Add-On Services",
      items: [
        {
          id: Date.now() + 41,
          name: "Dry Needling",
          charges: "",
          type: "Advanced",
        },
      ],
    },
  ];

  /*----------------------------------------------------------
        FORM DATA
  -----------------------------------------------------------*/

  const defaultForm = {

    name: "",

    age: "",

    gender: "",

    address: "",

    referredBy: "",

    dateTime: "",

    complaint: "",

    otherDetails: "",

    examination: "",
     
    inInv: "",

    investigation: "",

    diagnosis: "",

    advice: "",

    frequency: "",

    duration: "",

    homeRehab: "",

    hrp: "",

    arp: "",

    discount5: "",

    discount20: "",

  };

  /*----------------------------------------------------------
      STATES
  -----------------------------------------------------------*/

  const [formData, setFormData] =
    useState(defaultForm);

  const [leftSections, setLeftSections] =
    useState(defaultLeftSections);

  const [treatmentSections, setTreatmentSections] =
    useState(defaultTreatmentSections);

  /*----------------------------------------------------------
      POPUP STATE
  -----------------------------------------------------------*/

  const [showPopup, setShowPopup] =
    useState(false);

  const [popupMode, setPopupMode] =
    useState("add");

  const [selectedSection, setSelectedSection] =
    useState(null);

  const [editingItemId, setEditingItemId] =
    useState(null);

  const [popupData, setPopupData] =
    useState({

      name: "",

      charges: "",

      type: "Essential",

    });

  /*----------------------------------------------------------
      EDIT TITLE POPUP
  -----------------------------------------------------------*/

  const [showTitlePopup, setShowTitlePopup] =
    useState(false);

  const [editingSectionId, setEditingSectionId] =
    useState("");

  const [editingSectionType, setEditingSectionType] =
    useState("");

  const [editingTitle, setEditingTitle] =
    useState("");

  /*----------------------------------------------------------
        LOAD LOCAL STORAGE
  -----------------------------------------------------------*/

  useEffect(() => {

    const form =
      localStorage.getItem(
        "prescriptionFormData"
      );

    const left =
      localStorage.getItem(
        "leftSections"
      );

    const right =
      localStorage.getItem(
        "treatmentSections"
      );

    if (form)
      setFormData(JSON.parse(form));

    if (left)
      setLeftSections(JSON.parse(left));

    if (right)
      setTreatmentSections(JSON.parse(right));

  }, []);

  /*----------------------------------------------------------
        SAVE LOCAL STORAGE
  -----------------------------------------------------------*/

  useEffect(() => {

    localStorage.setItem(
      "prescriptionFormData",
      JSON.stringify(formData)
    );

  }, [formData]);

  useEffect(() => {

    localStorage.setItem(
      "leftSections",
      JSON.stringify(leftSections)
    );

  }, [leftSections]);

  useEffect(() => {

    localStorage.setItem(
      "treatmentSections",
      JSON.stringify(treatmentSections)
    );

  }, [treatmentSections]);

  /*----------------------------------------------------------
      INPUT CHANGE
  -----------------------------------------------------------*/

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  };

  /*----------------------------------------------------------
      POPUP INPUT
  -----------------------------------------------------------*/

  const handlePopupChange = (e) => {

    const { name, value } = e.target;

    setPopupData((prev) => ({

      ...prev,

      [name]: value,

    }));

  };

  /*----------------------------------------------------------
      OPEN ADD POPUP
  -----------------------------------------------------------*/

  const openAddPopup = (sectionId) => {

    setPopupMode("add");

    setSelectedSection(sectionId);

    setEditingItemId(null);

    setPopupData({

      name: "",

      charges: "",

      type: "Essential",

    });

    setShowPopup(true);

  };

  /*----------------------------------------------------------
      OPEN EDIT POPUP
  -----------------------------------------------------------*/

  const openEditPopup = (
    sectionId,
    item
  ) => {

    setPopupMode("edit");

    setSelectedSection(sectionId);

    setEditingItemId(item.id);

    setPopupData({

      name: item.name,

      charges: item.charges,

      type: item.type,

    });

    setShowPopup(true);

  };

  /*----------------------------------------------------------
      OPEN TITLE EDIT
  -----------------------------------------------------------*/

  const openTitlePopup = (
    sectionId,
    title,
    side
  ) => {

    setEditingSectionId(sectionId);

    setEditingTitle(title);

    setEditingSectionType(side);

    setShowTitlePopup(true);

  };

  /*----------------------------------------------------------
      CLOSE POPUP
  -----------------------------------------------------------*/

  const closePopup = () => {

    setShowPopup(false);

    setEditingItemId(null);

  };

  /*----------------------------------------------------------
      SAVE SERVICE
  -----------------------------------------------------------*/

  const saveService = () => {
    if (popupData.name.trim() === "") {
      alert("Please enter service name.");
      return;
    }

    const newItem = {
      id: Date.now(),
      name: popupData.name,
      charges: popupData.charges,
      type: popupData.type,
    };

    // LEFT SIDE
    if (leftSections.some((section) => section.id === selectedSection)) {
      const updated = leftSections.map((section) => {
        if (section.id === selectedSection) {
          return {
            ...section,
            items: [...section.items, newItem],
          };
        }
        return section;
      });

      setLeftSections(updated);
    }

    // RIGHT SIDE
    else {
      const updated = treatmentSections.map((section) => {
        if (section.id === selectedSection) {
          return {
            ...section,
            items: [...section.items, newItem],
          };
        }
        return section;
      });

      setTreatmentSections(updated);
    }

    closePopup();
  };

  /*----------------------------------------------------------
      UPDATE SERVICE
  -----------------------------------------------------------*/

  const updateService = () => {
    if (popupData.name.trim() === "") {
      alert("Please enter service name.");
      return;
    }

    if (leftSections.some((section) => section.id === selectedSection)) {
      const updated = leftSections.map((section) => {
        if (section.id !== selectedSection) return section;

        return {
          ...section,
          items: section.items.map((item) =>
            item.id === editingItemId
              ? {
                  ...item,
                  name: popupData.name,
                  charges: popupData.charges,
                  type: popupData.type,
                }
              : item
          ),
        };
      });

      setLeftSections(updated);
    } else {
      const updated = treatmentSections.map((section) => {
        if (section.id !== selectedSection) return section;

        return {
          ...section,
          items: section.items.map((item) =>
            item.id === editingItemId
              ? {
                  ...item,
                  name: popupData.name,
                  charges: popupData.charges,
                  type: popupData.type,
                }
              : item
          ),
        };
      });

      setTreatmentSections(updated);
    }

    closePopup();
  };

  /*----------------------------------------------------------
      DELETE SERVICE
  -----------------------------------------------------------*/

  const deleteService = (sectionId, itemId) => {
    if (!window.confirm("Delete this service?")) return;

    if (leftSections.some((section) => section.id === sectionId)) {
      const updated = leftSections.map((section) => {
        if (section.id !== sectionId) return section;

        return {
          ...section,
          items: section.items.filter((item) => item.id !== itemId),
        };
      });

      setLeftSections(updated);
    } else {
      const updated = treatmentSections.map((section) => {
        if (section.id !== sectionId) return section;

        return {
          ...section,
          items: section.items.filter((item) => item.id !== itemId),
        };
      });

      setTreatmentSections(updated);
    }
  };

  /*----------------------------------------------------------
      UPDATE SECTION TITLE
  -----------------------------------------------------------*/

  const updateHeading = () => {
    if (editingTitle.trim() === "") {
      alert("Heading cannot be empty.");
      return;
    }

    if (editingSectionType === "left") {
      const updated = leftSections.map((section) => {
        if (section.id === editingSectionId) {
          return {
            ...section,
            title: editingTitle,
          };
        }

        return section;
      });

      setLeftSections(updated);
    } else {
      const updated = treatmentSections.map((section) => {
        if (section.id === editingSectionId) {
          return {
            ...section,
            title: editingTitle,
          };
        }

        return section;
      });

      setTreatmentSections(updated);
    }

    setShowTitlePopup(false);
  };

  /*----------------------------------------------------------
      SAVE BUTTON
  -----------------------------------------------------------*/

  const handleSave = () => {
    localStorage.setItem(
      "prescriptionFormData",
      JSON.stringify(formData)
    );

    localStorage.setItem(
      "leftSections",
      JSON.stringify(leftSections)
    );

    localStorage.setItem(
      "treatmentSections",
      JSON.stringify(treatmentSections)
    );

    alert("Data Saved Successfully");
  };

  /*----------------------------------------------------------
      DRAG & DROP
  -----------------------------------------------------------*/

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];

    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
  };

const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      return;
    }

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    const leftSectionIndex = leftSections.findIndex(
      (section) => section.id === source.droppableId
    );

    if (leftSectionIndex !== -1) {
      setLeftSections((prevSections) =>
        prevSections.map((section) => {
          if (section.id !== source.droppableId) {
            return section;
          }

          return {
            ...section,
            items: reorder(
              section.items,
              source.index,
              destination.index
            ),
          };
        })
      );

      return;
    }

    const treatmentSectionIndex =
      treatmentSections.findIndex(
        (section) =>
          section.id === source.droppableId
      );

    if (treatmentSectionIndex !== -1) {
      setTreatmentSections((prevSections) =>
        prevSections.map((section) => {
          if (section.id !== source.droppableId) {
            return section;
          }

          return {
            ...section,
            items: reorder(
              section.items,
              source.index,
              destination.index
            ),
          };
        })
      );
    }
  };

   
  /*----------------------------------------------------------
      POPUP BUTTON
  -----------------------------------------------------------*/

  const handlePopupSubmit = () => {

    if (popupMode === "add") {

      saveService();

    } else {

      updateService();

    }

  };

  /*----------------------------------------------------------
      RETURN JSX START
  -----------------------------------------------------------*/

 return (
  <>
    {/* ================= SERVICE POPUP ================= */}

    {showPopup && (
      <div className="popup-overlay-settings-form">
        <div className="popup-box-settings-form">
          <div className="popup-header-settings-form">
            <h2>
              {popupMode === "add"
                ? "Add Service"
                : "Update Service"}
            </h2>

            <FaTimes
              className="popup-close-settings-form"
              onClick={closePopup}
            />
          </div>

          <div className="popup-body-settings-form">
            <label className="popup-label-settings-form">
              Service Name
            </label>

            <input
              type="text"
              name="name"
              value={popupData.name}
              onChange={handlePopupChange}
              className="popup-input-settings-form"
              placeholder="Enter Service Name"
            />

            <label className="popup-label-settings-form">
              Charges
            </label>

            <input
              type="number"
              name="charges"
              value={popupData.charges}
              onChange={handlePopupChange}
              className="popup-input-settings-form"
              placeholder="Enter Charges"
            />

            <label className="popup-label-settings-form">
              Service Type
            </label>

            <select
              name="type"
              value={popupData.type}
              onChange={handlePopupChange}
              className="popup-select-settings-form"
            >
              <option value="Essential">
                Essential
              </option>

              <option value="Advanced">
                Advanced
              </option>

              <option value="Both">
                Both
              </option>
            </select>
          </div>

          <div className="popup-footer-settings-form">
            <button
              type="button"
              className="cancel-btn-settings-form"
              onClick={closePopup}
            >
              Cancel
            </button>

            <button
              type="button"
              className="save-btn-settings-form"
              onClick={handlePopupSubmit}
            >
              {popupMode === "add"
                ? "Add"
                : "Update"}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* ================= HEADING POPUP ================= */}

    {showTitlePopup && (
      <div className="popup-overlay-settings-form">
        <div className="popup-box-settings-form">
          <div className="popup-header-settings-form">
            <h2>Edit Heading</h2>

            <FaTimes
              className="popup-close-settings-form"
              onClick={() =>
                setShowTitlePopup(false)
              }
            />
          </div>

          <div className="popup-body-settings-form">
            <label className="popup-label-settings-form">
              Heading
            </label>

            <input
              type="text"
              value={editingTitle}
              onChange={(e) =>
                setEditingTitle(e.target.value)
              }
              className="popup-input-settings-form"
              placeholder="Enter heading"
            />
          </div>

          <div className="popup-footer-settings-form">
            <button
              type="button"
              className="cancel-btn-settings-form"
              onClick={() =>
                setShowTitlePopup(false)
              }
            >
              Cancel
            </button>

            <button
              type="button"
              className="save-btn-settings-form"
              onClick={updateHeading}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    )}

    {/* ================= MAIN PAGE ================= */}

    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container-settings-form">

        {/* =====================================================
            LEFT PANEL
        ====================================================== */}

        <div className="left-panel-settings-form">

          {/* ================= DYNAMIC LEFT SECTIONS ================= */}

          {leftSections.map((section) => (
            <div
              key={section.id}
              className="section-box-settings-form"
            >
              {/* ================= SECTION HEADER ================= */}

              <div className="section-header-settings-form">
                <h3 className="section-title-settings-form">
                  {section.title}
                </h3>

                <FaEdit
                  className="icon-settings-form"
                  onClick={() =>
                    openTitlePopup(
                      section.id,
                      section.title,
                      "left"
                    )
                  }
                />

                <FaPlus
                  className="icon-settings-form"
                  onClick={() =>
                    openAddPopup(section.id)
                  }
                />
              </div>

              {/* ================= DRAG DROP LIST ================= */}

              <Droppable droppableId={section.id}>
                {(provided, snapshot) => (
                  <div
                    className={`service-list-settings-form ${
                      snapshot.isDraggingOver
                        ? "dragging-over-settings-form"
                        : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {section.items.map(
                      (item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={index}
                        >
                          {(
                            provided,
                            snapshot
                          ) => (
                            <div
                              className={`service-row-settings-form ${
                                snapshot.isDragging
                                  ? "dragging-item-settings-form"
                                  : ""
                              }`}
                              ref={
                                provided.innerRef
                              }
                              {...provided.draggableProps}
                            >
                              {/* DRAG HANDLE */}

                              <div
                                className="drag-handle-settings-form"
                                {...provided.dragHandleProps}
                              >
                                <FaGripVertical />
                              </div>

                              {/* SERVICE NAME */}

                              <div className="service-name-settings-form">
                                {item.name}
                              </div>

                              {/* CHARGES */}

                              <div className="service-charges-settings-form">
                                ₹ {item.charges || "0"}
                              </div>

                              {/* TYPE */}

                              <div className="service-type-settings-form">
                                {item.type}
                              </div>

                              {/* EDIT */}

                              <FaEdit
                                className="icon-small-settings-form"
                                onClick={() =>
                                  openEditPopup(
                                    section.id,
                                    item
                                  )
                                }
                              />

                              {/* DELETE */}

                              <FaTrash
                                className="icon-small-settings-form delete-settings-form"
                                onClick={() =>
                                  deleteService(
                                    section.id,
                                    item.id
                                  )
                                }
                              />
                            </div>
                          )}
                        </Draggable>
                      )
                    )}

                    {section.items.length === 0 && (
                      <div className="empty-service-settings-form">
                        No item added. Click + to add.
                      </div>
                    )}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}

          {/* ================= OTHER INVESTIGATION ================= */}

          <div className="section-box-settings-form">
            <div className="section-header-settings-form">
              <h3 className="section-title-settings-form">
                Other Investigation
              </h3>
            </div>

            <textarea
              name="investigation"
              value={formData.investigation}
              onChange={handleInputChange}
              className="textarea-settings-form"
              placeholder="Enter other investigation"
              rows="3"
            />
          </div>

          {/* ================= ON SITE TREATMENT CHARGES ================= */}

          <div className="section-box-settings-form">
            <div className="section-header-settings-form">
              <h3 className="section-title-settings-form">
                On-Site Treatment Charges
              </h3>
            </div>

            <div className="charges-table-settings-form">
              <div className="charges-table-header-settings-form">
                <div className="charges-header-item-settings-form">
                  Service
                </div>

                <div className="charges-header-item-settings-form">
                  Charges
                </div>
              </div>

              {treatmentSections.map((section) =>
                section.items.map((item) => (
                  <div
                    key={`charge-${section.id}-${item.id}`}
                    className="charges-table-row-settings-form"
                  >
                    <div className="charges-service-name-settings-form">
                      {item.name}
                    </div>

                    <div className="charges-input-wrapper-settings-form">
                      <span className="rupee-symbol-settings-form">
                        ₹
                      </span>

                      <input
                        type="number"
                        value={item.charges}
                        onChange={(e) => {
                          const value =
                            e.target.value;

                          setTreatmentSections(
                            (prevSections) =>
                              prevSections.map(
                                (
                                  currentSection
                                ) => {
                                  if (
                                    currentSection.id !==
                                    section.id
                                  ) {
                                    return currentSection;
                                  }

                                  return {
                                    ...currentSection,

                                    items:
                                      currentSection.items.map(
                                        (
                                          currentItem
                                        ) =>
                                          currentItem.id ===
                                          item.id
                                            ? {
                                                ...currentItem,
                                                charges:
                                                  value,
                                              }
                                            : currentItem
                                      ),
                                  };
                                }
                              )
                          );
                        }}
                        className="charges-input-settings-form"
                        placeholder="Charges"
                        min="0"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

         {/* ================= HOME REHAB ================= */}

<div className="section-box-settings-form">
  <div className="section-header-settings-form">
    <h3 className="section-title-settings-form">
     In-Home Physical Rehab
    </h3>
  </div>

  <div className="single-field-settings-form">
    <input
      type="text"
      name="homeRehab"
      value={formData.homeRehab}
      onChange={handleInputChange}
      className="form-input-settings-form"
      placeholder="Enter Home Rehab"
    />
  </div>
</div>


{/* ================= HRP ================= */}

<div className="section-box-settings-form">
  <div className="section-header-settings-form">
    <h3 className="section-title-settings-form">
     Home Recovery Prgram (HRP)
    </h3>
  </div>

  <div className="single-field-settings-form">
    <input
      type="text"
      name="hrp"
      value={formData.hrp}
      onChange={handleInputChange}
      className="form-input-settings-form"
      placeholder="Enter HRP"
    />
  </div>
</div>


{/* ================= ARP ================= */}

<div className="section-box-settings-form">
  <div className="section-header-settings-form">
    <h3 className="section-title-settings-form">
      Accelerated Recovery Package (ARP)
    </h3>
  </div>

  <div className="single-field-settings-form">
    <input
      type="text"
      name="arp"
      value={formData.arp}
      onChange={handleInputChange}
      className="form-input-settings-form"
      placeholder="Enter ARP"
    />
  </div>
</div>

<div className="note-settings-form">
    <h4>Note: Charges are vary according to the condition of the patient</h4>
</div>

          {/* ================= DISCOUNT ================= */}

          <div className="section-box-settings-form">
            <div className="section-header-settings-form">
              <h3 className="section-title-settings-form">
                Discount
              </h3>
            </div>

            <div className="discount-grid-settings-form">
              <div className="discount-field-settings-form">
                <label className="field-label-settings-form">
                  Discount on 5 Sessions (%)
                </label>

                <div className="percentage-input-wrapper-settings-form">
                  <input
                    type="number"
                    name="discount5"
                    value={formData.discount5}
                    onChange={handleInputChange}
                    className="form-input-settings-form percentage-input-settings-form"
                    placeholder="Enter discount"
                    min="0"
                  />

                  <span className="percentage-symbol-settings-form">
                    %
                  </span>
                </div>
              </div>

              <div className="discount-field-settings-form">
                <label className="field-label-settings-form">
                  Discount on 20 Sessions (%)
                </label>

                <div className="percentage-input-wrapper-settings-form">
                  <input
                    type="number"
                    name="discount20"
                    value={formData.discount20}
                    onChange={handleInputChange}
                    className="form-input-settings-form percentage-input-settings-form"
                    placeholder="Enter discount"
                    min="0"
                  />

                  <span className="percentage-symbol-settings-form">
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= LEFT PANEL END ================= */}

        {/* =====================================================
            RIGHT PANEL
        ====================================================== */}

        <div className="right-panel-settings-form">

          {/* ================= PATIENT DETAILS ================= */}

          <div className="patient-details-box-settings-form">
            <div className="main-heading-settings-form">
              <h2 className="main-title-settings-form">
                Patient Details
              </h2>
            </div>

            <div className="patient-grid-settings-form">
              <div className="form-group-settings-form">
                <label className="field-label-settings-form">
                  Patient Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input-settings-form"
                  placeholder="Enter patient name"
                />
              </div>

              <div className="form-group-settings-form">
                <label className="field-label-settings-form">
                  Age
                </label>

                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="form-input-settings-form"
                  placeholder="Enter age"
                />
              </div>

              <div className="form-group-settings-form">
                <label className="field-label-settings-form">
                  Gender
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form-select-settings-form"
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div className="form-group-settings-form">
                <label className="field-label-settings-form">
                  Referred By
                </label>

                <input
                  type="text"
                  name="referredBy"
                  value={formData.referredBy}
                  onChange={handleInputChange}
                  className="form-input-settings-form"
                  placeholder="Enter referred by"
                />
              </div>

              <div className="form-group-full-settings-form">
                <label className="field-label-settings-form">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input-settings-form"
                  placeholder="Enter address"
                />
              </div>

              <div className="form-group-full-settings-form">
                <label className="field-label-settings-form">
                  Date / Time
                </label>

                <input
                  type="datetime-local"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleInputChange}
                  className="form-input-settings-form"
                />
              </div>
            </div>
          </div>

         {/* ================= COMPLAINT / C/CO ================= */}

<div className="right-section-box-settings-form">
  <div className="right-section-header-settings-form">
    <h3 className="right-section-title-settings-form">
      C/Co
    </h3>
  </div>

  <input
    type="text"
    name="complaint"
    value={formData.complaint}
    onChange={handleInputChange}
    className="form-input-settings-form"
    placeholder="Enter Prefilled Value"
  />
</div>


{/* ================= OTHER DETAILS ================= */}

<div className="right-section-box-settings-form">
  <div className="right-section-header-settings-form">
    <h3 className="right-section-title-settings-form">
      Other Details
    </h3>
  </div>

  <input
    type="text"
    name="otherDetails"
    value={formData.otherDetails}
    onChange={handleInputChange}
    className="form-input-settings-form"
    placeholder="Enter Prefilled Value"
  />
</div>


{/* ================= EXAMINATION ================= */}

<div className="right-section-box-settings-form">
  <div className="right-section-header-settings-form">
    <h3 className="right-section-title-settings-form">
      Examination
    </h3>
  </div>

  <input
    type="text"
    name="examination"
    value={formData.examination}
    onChange={handleInputChange}
    className="form-input-settings-form"
    placeholder="Enter Prefilled Value"
  />
</div>


{/* ================= IN INV ================= */}

<div className="right-section-box-settings-form">
  <div className="right-section-header-settings-form">
    <h3 className="right-section-title-settings-form">
      In Inv.
    </h3>
  </div>

  <input
    type="text"
    name="inInv"
    value={formData.inInv || ""}
    onChange={handleInputChange}
    className="form-input-settings-form"
    placeholder="Enter Prefilled Value"
  />
</div>


{/* ================= DIAGNOSIS ================= */}

<div className="right-section-box-settings-form">
  <div className="right-section-header-settings-form">
    <h3 className="right-section-title-settings-form">
      Diagnosis
    </h3>
  </div>

  <input
    type="text"
    name="diagnosis"
    value={formData.diagnosis}
    onChange={handleInputChange}
    className="form-input-settings-form"
    placeholder="Enter Prefilled Value"
  />
</div>

          {/* ================= ADVICE ================= */}

          <div className="right-section-box-settings-form">
            <div className="right-section-header-settings-form">
              <h3 className="right-section-title-settings-form">
                Advice / Note
              </h3>
            </div>

            <textarea
              name="advice"
              value={formData.advice}
              onChange={handleInputChange}
              className="textarea-settings-form"
              placeholder="Enter advice or note"
              rows="3"
            />
          </div>

          {/* ================= PHYSIOTHERAPY HEADING ================= */}

          <div className="physiotherapy-heading-settings-form">
            <h2 className="physiotherapy-title-settings-form">
              Physiotherapy Treatment Rx
            </h2>
          </div>

          {/* ================= TREATMENT SECTIONS ================= */}

          {treatmentSections.map((section) => (
            <div
              key={section.id}
              className="treatment-section-settings-form"
            >
        <div className="treatment-header-settings-form">
  <div className="treatment-heading-left-settings-form">
    <h3 className="treatment-title-settings-form">
      {section.title}
    </h3>

    {/* ================= HEADING CHARGES ================= */}

    <div className="heading-charge-box-settings-form">
      <span className="heading-charge-rupee-settings-form">
        ₹
      </span>

      <input
        type="number"
        value={section.charges || ""}
        onChange={(e) => {
          const value = e.target.value;

          setTreatmentSections((prevSections) =>
            prevSections.map((currentSection) =>
              currentSection.id === section.id
                ? {
                    ...currentSection,
                    charges: value,
                  }
                : currentSection
            )
          );
        }}
        className="heading-charge-input-settings-form"
        placeholder="Charges"
        min="0"
      />
    </div>
  </div>

  <div className="treatment-header-actions-settings-form">
    {/* ================= EDIT HEADING ================= */}

    <button
      type="button"
      className="header-icon-btn-settings-form"
      onClick={() =>
        openTitlePopup(
          section.id,
          section.title,
          "right"
        )
      }
      title="Edit Heading"
    >
      <FaEdit />
    </button>

    {/* ================= ADD SERVICE ================= */}

    <button
      type="button"
      className="header-icon-btn-settings-form"
      onClick={() =>
        openAddPopup(section.id)
      }
      title="Add Service"
    >
      <FaPlus />
    </button>
  </div>
</div>
              <Droppable droppableId={section.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`treatment-list-settings-form ${
                      snapshot.isDraggingOver
                        ? "dragging-over-settings-form"
                        : ""
                    }`}
                  >
                    {section.items.map(
                      (item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={index}
                        >
                          {(
                            provided,
                            snapshot
                          ) => (
                            <div
                              ref={
                                provided.innerRef
                              }
                              {...provided.draggableProps}
                              className={`treatment-row-settings-form ${
                                snapshot.isDragging
                                  ? "dragging-item-settings-form"
                                  : ""
                              }`}
                            >
                              <button
                                type="button"
                                className="drag-button-settings-form"
                                {...provided.dragHandleProps}
                                title="Hold and Drag"
                              >
                                <FaGripVertical />
                              </button>

                              <div className="treatment-service-name-settings-form">
                                <span className="treatment-name-text-settings-form">
                                  {item.name}
                                </span>

                                <span
                                  className={`service-type-badge-settings-form service-type-${item.type
                                    .toLowerCase()
                                    .replace(
                                      /\s+/g,
                                      "-"
                                    )}-settings-form`}
                                >
                                  {item.type}
                                </span>
                              </div>

                              <div className="treatment-charge-box-settings-form">
                                <span className="treatment-rupee-settings-form">
                                  ₹
                                </span>

                                <input
                                  type="number"
                                  value={item.charges}
                                  onChange={(e) => {
                                    const value =
                                      e.target.value;

                                    setTreatmentSections(
                                      (
                                        prevSections
                                      ) =>
                                        prevSections.map(
                                          (
                                            currentSection
                                          ) => {
                                            if (
                                              currentSection.id !==
                                              section.id
                                            ) {
                                              return currentSection;
                                            }

                                            return {
                                              ...currentSection,

                                              items:
                                                currentSection.items.map(
                                                  (
                                                    currentItem
                                                  ) =>
                                                    currentItem.id ===
                                                    item.id
                                                      ? {
                                                          ...currentItem,
                                                          charges:
                                                            value,
                                                        }
                                                      : currentItem
                                                ),
                                            };
                                          }
                                        )
                                    );
                                  }}
                                  className="treatment-charge-input-settings-form"
                                  placeholder="Charges"
                                  min="0"
                                />
                              </div>

                              <button
                                type="button"
                                className="service-edit-btn-settings-form"
                                onClick={() =>
                                  openEditPopup(
                                    section.id,
                                    item
                                  )
                                }
                                title="Edit Service"
                              >
                                <FaEdit />
                              </button>

                              <button
                                type="button"
                                className="service-delete-btn-settings-form"
                                onClick={() =>
                                  deleteService(
                                    section.id,
                                    item.id
                                  )
                                }
                                title="Delete Service"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      )
                    )}

                    {section.items.length === 0 && (
                      <div className="empty-service-settings-form">
                        No services added. Click + to add
                        service.
                      </div>
                    )}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}

          {/* ================= FREQUENCY AND DURATION ================= */}

          <div className="frequency-duration-box-settings-form">
            <div className="frequency-duration-grid-settings-form">
              <div className="form-group-settings-form">
                <label className="field-label-settings-form">
                  Frequency
                </label>

                <input
                  type="text"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="form-input-settings-form"
                  placeholder="Enter frequency"
                />
              </div>

              <div className="form-group-settings-form">
                <label className="field-label-settings-form">
                  Duration
                </label>

                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="form-input-settings-form"
                  placeholder="Enter duration"
                />
              </div>
            </div>
          </div>

          <div className="note-settings-form">
            <h4>Treatment duration mentioned above is approximate & subject to change</h4>
          </div>

          {/* ================= SAVE ================= */}

          <div className="form-save-section-settings-form">
            <button
              type="button"
              className="main-save-btn-settings-form"
              onClick={handleSave}
            >
              Save Settings
            </button>
          </div>

        </div>

        {/* ================= RIGHT PANEL END ================= */}

      </div>

      {/* ================= CONTAINER END ================= */}

    </DragDropContext>
  </>
);
}