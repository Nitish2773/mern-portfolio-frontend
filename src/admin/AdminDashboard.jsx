import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useLoading } from "../Context/LoadingContext";
import { Tab } from "@headlessui/react";
import CrudManager from "./CRUDManager";

import ProjectForm from "./ProjectForm";
import SkillForm from "./SkillForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import CertificationForm from "./CertificationForm";
import ProfileForm from "./ProfileForm";

// ✅ Only pass relative endpoints
const sections = [
  { key: "projects", label: "Projects", endpoint: "/api/projects", FormComponent: ProjectForm },
  { key: "skills", label: "Skills", endpoint: "/api/skills", FormComponent: SkillForm },
  { key: "education", label: "Education", endpoint: "/api/education", FormComponent: EducationForm },
  { key: "experience", label: "Experience", endpoint: "/api/experience", FormComponent: ExperienceForm },
  { key: "certifications", label: "Certifications", endpoint: "/api/certifications", FormComponent: CertificationForm },
  { key: "profile", label: "Profile", endpoint: "/api/profile", single: true, FormComponent: ProfileForm },
];

export default function AdminDashboard() {
  const { admin, logout, token } = useAuth();
  const { setLoading } = useLoading();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [selected, setLoading]);

  const authenticatedSections = sections.map((s) => ({
    ...s,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  }));

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 via-sriBlue-500 to-teal-500 text-white p-6 flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-tight">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="font-semibold">{admin?.name || "Admin"}</span>
          <button
            onClick={logout}
            className="bg-red-500 px-5 py-2 rounded-xl shadow-md hover:bg-red-600 hover:scale-105 transition-transform"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 p-6">
        <Tab.Group selectedIndex={selected} onChange={setSelected}>
          {/* Tabs */}
          <Tab.List className="flex gap-4 overflow-x-auto sticky top-0 z-20 bg-gray-50 dark:bg-gray-900 pb-2 border-b border-gray-200 dark:border-gray-700">
            {authenticatedSections.map((s) => (
              <Tab key={s.key} className="outline-none flex-shrink-0">
                {({ selected }) => (
                  <div
                    className={`cursor-pointer px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      selected
                        ? "bg-gradient-to-r from-indigo-500 via-sriBlue-500 to-teal-500 text-white shadow-lg transform scale-105"
                        : "text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-teal-400 hover:scale-105"
                    }`}
                  >
                    {s.label}
                  </div>
                )}
              </Tab>
            ))}
          </Tab.List>

          {/* Panels */}
          <Tab.Panels className="mt-8 space-y-6">
            {authenticatedSections.map((s) => (
              <Tab.Panel
                key={s.key}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300"
              >
                <CrudManager
                  endpoint={s.endpoint} // only relative path
                  headers={s.headers}
                  readOnly={s.readOnly}
                  single={s.single}
                  FormComponent={s.FormComponent}
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </main>
    </div>
  );
}
