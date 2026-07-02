import React, { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import "./PatientTreatmentProtocol.css";
import { useNavigate, useLocation } from "react-router-dom";
export default function PatientTreatmentProtocol() {

   const navigate = useNavigate();
  const location = useLocation();

  // Treatment Protocol Menu Data

  const treatmentMenus = [
    {
      id: 1,
      title: "Assessment",
      subMenus: [
        "Pain Assessment",
        "Posture Assessment",
        "ROM Assessment",
        "Muscle Strength",
      ],
    },
    {
      id: 2,
      title: "Electro Therapy",
      subMenus: [
        "IFT",
        "Ultrasound",
        "Laser",
        "TENS",
      ],
    },
    {
      id: 3,
      title: "Exercise",
      subMenus: [
        "Stretching",
        "Strengthening",
        "Balance Training",
        "Gait Training",
      ],
    },
    {
      id: 4,
      title: "Manual Therapy",
      subMenus: [
        "Mobilization",
        "Manipulation",
        "Massage",
      ],
    },
    {
      id: 5,
      title: "Advice",
      subMenus: [
        "Home Exercise",
        "Posture Correction",
        "Activity Modification",
      ],
    },
  ];

  // States

  const [templates, setTemplates] = useState([]);
  const [showTemplatePopup, setShowTemplatePopup] = useState(false);
  const [templateName, setTemplateName] =useState("");
  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] =  useState(null);
  const [expandedMenu, setExpandedMenu] = useState(null);
   

  // Add Template

  const handleAddTemplate = () => {

    if (!templateName.trim()) return;

    const newTemplate = {
      id: Date.now(),
      name: templateName,
      selectedItems: [],
    };

    setTemplates([...templates, newTemplate]);

    setTemplateName("");

    setShowTemplatePopup(false);
  };

  // Delete Template

  const handleDeleteTemplate = (id) => {

    setTemplates(
      templates.filter((item) => item.id !== id)
     ); };

  // Open Menu Popup

  const handleOpenMenuPopup = (id) => {

    setSelectedTemplateId(id);

    setShowMenuPopup(true);

  };

  // Add Sub Menu

  const handleAddSubMenu = (submenu) => {

    const updatedTemplates = templates.map((template) => {

      if (template.id === selectedTemplateId) {

        if (
          template.selectedItems.includes(submenu)
        ) {
          return template;
        }

        return {
          ...template,
          selectedItems: [
            ...template.selectedItems,
            submenu,
          ],
        };
      }

      return template;
    });

    setTemplates(updatedTemplates);

    setShowMenuPopup(false);
  };

         // JSX

  return (

    <div className="protocol-page-patient-protocol">

      <FaTimes
        className="close-icon-patient-protocol"
        onClick={() =>
          navigate("/homepage", {
            state: {
              openPatientPopup: true,
            },
          })
        }
      />

                 {/* LEFT PANEL */}
    
      <div className="left-panel-patient-protocol">

        <h2 className="heading-patient-protocol">
          Treatment Protocol
        </h2>

        {

          treatmentMenus.map((menu) => (

            <div
              key={menu.id}
              className="menu-card-patient-protocol"
            >

              <div className="menu-title-patient-protocol">

                {menu.title}

              </div>

              <ul className="submenu-list-patient-protocol">

                {

                  menu.subMenus.map((submenu, index) => (

                    <li
                      key={index}
                      className="submenu-item-patient-protocol"
                    >
                      {submenu}
                    </li>

                  ))

                }

              </ul>

            </div>

          ))

        }

      </div>

                {/* RIGHT PANEL*/}
       
      <div className="right-panel-patient-protocol">

        <div className="header-patient-protocol">

          <h2 className="heading-patient-protocol">Template Setting </h2>
            
         

          <button
            className="add-template-btn-patient-protocol"
            onClick={() => setShowTemplatePopup(true)}
             > + Add Template
          </button>  
        </div>

        {

          templates.length === 0 && (

            <div className="empty-text-patient-protocol"> No Template Added</div>
          )
           }  
        {

          templates.map((template) => (

            <div
              key={template.id} className="template-card-patient-protocol">
              <div className="template-header-patient-protocol">

                <span className="template-name-patient-protocol">

                  {template.name}

                </span>

                <div className="template-icons-patient-protocol">

                  <FaPlus
                    className="plus-icon-patient-protocol"
                    onClick={() =>
                      handleOpenMenuPopup(
                        template.id
                      )
                    }
                  />

                  <FaTrash
                    className="delete-icon-patient-protocol"
                    onClick={() =>
                      handleDeleteTemplate(
                        template.id
                      )
                    }
                  />

                </div>

              </div>

              {

                template.selectedItems.length > 0 && (

                  <ul className="selected-list-patient-protocol">

                    {

                      template.selectedItems.map(
                        (item, index) => (

                          <li key={index}>

                            {item}

                          </li>

                        )
                      )

                    }

                  </ul>

                )

              }

            </div>

          ))

        }

      </div>

                 {/* ADD TEMPLATE POPUP*/}
       
      {

        showTemplatePopup && (

          <div className="popup-overlay-patient-protocol">

            <div className="popup-box-patient-protocol">

              <div className="popup-header-patient-protocol">

                <h3>Add Template</h3>

                <FaTimes
                  className="close-icon-patient-protocol"
                  onClick={() =>
                    setShowTemplatePopup(false)
                  }
                />

              </div>

              <input
                type="text"
                placeholder="Add Template"
                value={templateName}
                className="input-patient-protocol"
                onChange={(e) =>
                  setTemplateName(
                    e.target.value
                  )
                }
              />

              <button
                className="save-btn-patient-protocol"
                onClick={handleAddTemplate}
              >
                Add
              </button>

            </div>

          </div>

        )

      }

      {/*  MENU / SUBMENU POPUP*/}

      {showMenuPopup && (
        <div className="popup-overlay-patient-protocol">

          <div className="popup-box-patient-protocol popup-menu-box-patient-protocol">

            <div className="popup-header-patient-protocol">

              <h3>Select Menu</h3>

              <FaTimes
                className="close-icon-patient-protocol"
                onClick={() => setShowMenuPopup(false)}
              />

            </div>

            <div className="popup-menu-list-patient-protocol">

              {treatmentMenus.map((menu) => (

                <div
                  key={menu.id}
                  className="popup-menu-card-patient-protocol"
                >

                  <div
                    className="popup-menu-title-patient-protocol"
                    onClick={() =>
                      setExpandedMenu(
                        expandedMenu === menu.id
                          ? null
                          : menu.id
                      )
                    }
                  >

                    <div className="popup-menu-left-patient-protocol">

                      {expandedMenu === menu.id ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}

                      <span>{menu.title}</span>

                    </div>

                  </div>

                  {expandedMenu === menu.id && (

                    <div className="popup-submenu-patient-protocol">

                      {menu.subMenus.map((submenu, index) => (

                        <div
                          key={index}
                          className="popup-submenu-item-patient-protocol"
                          onClick={() =>
                            handleAddSubMenu(submenu)
                          }
                        >
                          {submenu}
                        </div>

                      ))}

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

        </div>
      )}

    </div>

  );

}