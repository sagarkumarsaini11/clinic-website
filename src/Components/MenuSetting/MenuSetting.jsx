import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./MenuSetting.css";

export default function MenuSetting() {
  const [menus, setMenus] =useState([
    {
      id: 1,
      title: "Menu 1",
      subMenus: ["Sub Menu 1", "Sub Menu 2", "Sub Menu 3"],
    },
    {
      id: 2,
      title: "Menu 2",
      subMenus: ["Sub Menu 1", "Sub Menu 2", "Sub Menu 3"],
    },
  ]);

  // Main Popup
  const [showPopup, setShowPopup] = useState(false);
  const [menuName, setMenuName] = useState("");


  // Sub Menu Popup
  const [showSubPopup, setShowSubPopup] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [newSubMenu, setNewSubMenu] = useState("");

  //edit popup 
  const [editSubPopup, setEditSubPopup] = useState(false);
  const [editMenuId, setEditMenuId] = useState(null);
  const [editSubIndex, setEditSubIndex] = useState(null);
  const [editSubName, setEditSubName] = useState("");

  //Template states
  const [templates, setTemplates] = useState([]);
const [showTemplatePopup, setShowTemplatePopup] = useState(false);
const [templateName, setTemplateName] = useState("");
const [showMenuPopup, setShowMenuPopup] = useState(false);
const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  // Add Menu left side
const handleAddMenu = () => {
  if (!menuName.trim()) return;

  setMenus([
    ...menus,
    {
      id: Date.now(),
      title: menuName,
      subMenus: [],
    },
  ]);

  setMenuName("");
  setShowPopup(false);
};

  // Open Submenu Popup left side
  const openSubMenuPopup = (id) => {
    setSelectedMenuId(id);
    setNewSubMenu("");
    setShowSubPopup(true);
  };

  // Add Submenu left side
  const handleAddSubMenu = () => {
    if (!newSubMenu.trim()) return;

    const updatedMenus = menus.map((menu) => {
      if (menu.id === selectedMenuId) {
        return {
          ...menu,
          subMenus: [...menu.subMenus, newSubMenu],
        };
      }
      return menu;
    });

    setMenus(updatedMenus);
    setShowSubPopup(false);
  };

  // Add template in right side
 
const handleAddTemplate = () => {
  if (!templateName.trim()) return;

  setTemplates([
    ...templates,
    {
      id: Date.now(),
      name: templateName,
      subTemplates: [],
      showMenu: false,
    },
  ]);

  setTemplateName("");
  setShowTemplatePopup(false);
};

// Delete Template right side
const handleDeleteTemplate = (id) => {
  setTemplates(templates.filter((item) => item.id !== id));
};

// Open submenu list right side
const handleOpenSubMenuList = (id) => {
  setSelectedTemplateId(id);
  setShowMenuPopup(true);
};

// Add submenu to template 
const handleAddSubTemplate = (templateId, subName) => {
  setTemplates((prev) =>
    prev.map((item) =>
      item.id === templateId
        ? {
            ...item,
            subTemplates: [...item.subTemplates, subName],
          }
        : item
    )
  );

  setShowMenuPopup(false);
};

//delete sub-template function
const handleDeleteSubTemplate = (templateId, subIndex) => {
  setTemplates((prevTemplates) =>
    prevTemplates.map((template) => {
      if (template.id === templateId) {
        return {
          ...template,
          subTemplates: template.subTemplates.filter(
            (_, index) => index !== subIndex
          ),
        };
      }
      return template;
    })
  );
};

// Open Edit Popup left side
const handleEditSubMenu = (menuId, index, value) => {
  setEditMenuId(menuId);
  setEditSubIndex(index);
  setEditSubName(value);
  setEditSubPopup(true);
};

// Save Edited Submenu left side
const handleUpdateSubMenu = () => {
  setMenus(
    menus.map((menu) => {
      if (menu.id === editMenuId) {
        const updated = [...menu.subMenus];
        updated[editSubIndex] = editSubName;

        return {
          ...menu,
          subMenus: updated,
        };
      }
      return menu;
    })
  );

  setEditSubPopup(false);
};

// Delete Submenu left side
const handleDeleteSubMenu = (menuId, index) => {
  setMenus(
    menus.map((menu) => {
      if (menu.id === menuId) {
        return {
          ...menu,
          subMenus: menu.subMenus.filter(
            (_, i) => i !== index
          ),
        };
      }
      return menu;
    })
  );
};

  return (
    <div className="container-menu-setting">

      <div className="sidebar-menu-setting">

        <div className="header-menu-setting">
          <h2>Treatment protocol</h2>

          <button  className="add-btn-menu-setting"
           onClick={() => setShowPopup(true)}> + Add 
          </button> 
          </div> 
           
        {menus.map((menu) => (
          <div
            key={menu.id} className="menu-box-menu-setting">
            <div className="menu-title-menu-setting">
              <span>{menu.title}</span>

              <FaPlus
                className="menu-plus-icon-menu-setting"
                onClick={() => openSubMenuPopup(menu.id)}/>
            </div>

            <ul className="submenu-list-menu-setting">
              {menu.subMenus.map((sub, index) => (
               <li
            key={index} className="submenu-item-menu-setting">
              <span>{sub}</span>

            <div className="submenu-action-menu-setting">

         <FaEdit  className="submenu-icon-menu-setting"
         onClick={() => handleEditSubMenu(menu.id, index, sub)}/>

         <FaTrash
         className="submenu-icon-menu-setting delete-menu-setting"
         onClick={() =>  handleDeleteSubMenu(menu.id, index)} />
       </div>
       </li>
              ))}
            </ul>

          </div>
        ))}

      </div>


                  {/* Add Menu Popup */}

     {showPopup && (
  <div className="popup-overlay-menu-setting">
    <div className="popup-box-menu-setting">

      <h3>Add </h3>

      <input
        className="input-menu-setting"
        placeholder="Add Menu"
        value={menuName}
        onChange={(e) => setMenuName(e.target.value)} />
     

      <div className="popup-btn-group-menu-setting">
        <button
          className="cancel-btn-menu-setting"
          onClick={() => setShowPopup(false)}>
         Cancel
        </button> 
        

        <button  className="save-btn-menu-setting"
         onClick={handleAddMenu}>
           Add Menu
         </button>
      </div>

    </div>
  </div>
)}

      {/* Add Submenu Popup */}

      {showSubPopup && (
        <div className="popup-overlay-menu-setting">

          <div className="popup-box-menu-setting">
            <h3>Add Sub Menu</h3>

            <input
              className="input-menu-setting"
              placeholder="Enter Sub Menu"
              value={newSubMenu}
              onChange={(e) => setNewSubMenu(e.target.value)} />
           

            <div className="popup-btn-group-menu-setting">

              <button
                className="cancel-btn-menu-setting"
                onClick={() => setShowSubPopup(false)} >
              Cancel
             </button>  
              

              <button
                className="save-btn-menu-setting"
                onClick={handleAddSubMenu} >
             Add
            </button>    
            </div>

          </div>

        </div>
      )}
      
                     {/* edit popup */}
{editSubPopup && (
  <div className="popup-overlay-menu-setting">
    <div className="popup-box-menu-setting">

      <h3>Edit Sub Menu</h3>

      <input
        className="input-menu-setting"
        value={editSubName}
        onChange={(e) => setEditSubName(e.target.value)}/>
         
    
      <div className="popup-btn-group-menu-setting">
        <button  className="cancel-btn-menu-setting"
         onClick={() => setEditSubPopup(false)} >
         Cancel
       </button>
          
        <button className="save-btn-menu-setting"
          onClick={handleUpdateSubMenu}>
          Update
         </button>
        
      </div>

    </div>
  </div>
)}

              {/* template code */}
    <div className="template-section-menu-setting">

    <div className="template-header-menu-setting">

        <h2>Template Setting</h2>

        <button  className="add-btn-menu-setting"
            onClick={() => setShowTemplatePopup(true)}>
           + Add New Template
        </button>
          
    </div>

    {templates.map((template) => (

        <div
            key={template.id}
            className="template-card-menu-setting">
        

            <div className="template-title-menu-setting">

                <span>{template.name}</span>

                <div className="template-icons-menu-setting">

                    <FaPlus
                        className="menu-plus-icon-menu-setting"
                        onClick={() => handleOpenSubMenuList(template.id)}  />

                    <FaTrash
                        className="delete-btn-menu-setting"
                        onClick={() => handleDeleteTemplate(template.id)}/>
                </div>

            </div>

          

            {template.subTemplates.length > 0 && (

              <ul className="template-submenu-menu-setting">
  {template.subTemplates.map((sub, index) => (
    <li
      key={index}
      className="template-submenu-item-menu-setting"
    >
      <span>{sub}</span>

      <FaTrash
        className="delete-submenu-btn-menu-setting"
        onClick={() =>
          handleDeleteSubTemplate(template.id, index)
        }
      />
        
    </li>
  ))}
</ul>

            )}

        </div>

    ))}

    

</div>

                      {/* template popup */}
{showTemplatePopup && (

<div className="popup-overlay-menu-setting">

    <div className="popup-box-menu-setting">

        <h3>Add Template</h3>

        <input
            className="input-menu-setting"
            placeholder="Add Template"
            value={templateName}
            onChange={(e) =>
                setTemplateName(e.target.value)}/>
            
        <div className="popup-btn-group-menu-setting">

            <button
                className="cancel-btn-menu-setting"
                onClick={() =>
                    setShowTemplatePopup(false) }>Cancel
               </button> 
          
            <button
                className="save-btn-menu-setting"
                onClick={handleAddTemplate}>Add
            </button>
        </div>

    </div>

</div>

)} 

{/* show popup */}
{showMenuPopup && (
  <div className="popup-overlay-menu-setting">
    <div className="popup-box-menu-setting">

      <h3>Select Menu / Sub Menu</h3>

      <div className="popup-menu-list-menu-setting">

        {menus.map((menu) => (
          <div key={menu.id}>

            <div className="popup-menu-heading-menu-setting">
              {menu.title}
            </div>

            {menu.subMenus.map((sub, index) => (
              <div
                key={index}
                className="popup-submenu-item-menu-setting"
                onClick={() =>
                  handleAddSubTemplate(
                    selectedTemplateId,
                    sub
                  )
                }
              >
                {sub}
              </div>
            ))}

          </div>
        ))}

      </div>

      <div className="popup-btn-group-menu-setting">

        <button
          className="cancel-btn-menu-setting"
          onClick={() => setShowMenuPopup(false)}
        >
          Close
        </button>

      </div>

    </div>
  </div>
)}



    </div>
  );
}

