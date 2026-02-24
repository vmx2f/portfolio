"use client";

import React, { useState } from "react";
import Popover from "../layout/pop-over";
import { getTechIcon } from "../layout/icon-mappings";
import Modal from "../layout/modal";
import { useProjectsData, type Project } from "../../_constants/projects";
import { useExtracted } from "next-intl";
import { techNameMap } from "../../_constants/tech-mappings";

const Projects = () => {
  const projects = useProjectsData();
  const t = useExtracted();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getTechIconForProject = (techName: string, size: string = 'text-2xl') => {
    // First try to find a mapped name
    const mappedName = techNameMap[techName.toLowerCase()] || techName;

    // Get the icon with the mapped name
    const icon = getTechIcon(mappedName, `${size} text-theme-color hover:text-theme-color/90 transition-colors`);

    // If no icon found, log a warning and return null to use the fallback
    if (!icon) {
      console.warn(`No icon found for technology: ${techName} (mapped to: ${mappedName})`);
      return null;
    }

    return icon;
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="animate-swipe-in border border-subtle bg-background rounded-lg py-5 mb-50 bg-main/90 w-full max-h-[calc(100vh-200px)] overflow-y-auto pb-8 scrollbar-thin scrollbar-thumb-theme-color/20 scrollbar-track-transparent hover:scrollbar-thumb-theme-color/30 transition-colors duration-300">
      {projects.map((p: Project) => (
        <a
          key={p.slug}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            openModal(p);
          }}
          className="inline-block w-full"
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center py-3 px-4 sm:px-6 transition-all duration-300 ease-in-out hover:bg-theme-color/10 hover:border-theme-color/50 border border-transparent rounded-lg mx-2 sm:mx-5 text-theme-color group"
          >
            <div className="flex-1 min-w-0">
              <span className="flex items-center inline">
                <span className="opacity-70 group-hover:opacity-100 transition-opacity pr-2">↗</span>
                <span className="font-medium">{p.title}</span>
                <span className="text-sm opacity-70 whitespace-nowrap"> - </span>
                <span className="text-sm opacity-70 whitespace-nowrap">{p.date}</span>
              </span>
            </div>

            <div className="mt-2 sm:mt-0 sm:ml-4 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center flex-wrap gap-1.5">
                  {p.technologies.map((techName, index) => {
                    const icon = getTechIconForProject(techName, 'text-sm');
                    return (
                      <React.Fragment key={techName}>
                        <Popover
                          trigger={
                            <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-main/5 hover:bg-theme-color/10 border border-transparent transition-colors duration-200 flex-shrink-0">
                              {icon || (
                                <span className="text-xs text-theme-color/80 font-mono">
                                  {techName.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2)}
                                </span>
                              )}
                            </div>
                          }
                          position="top-center"
                        >
                          <div className="bg-hover text-primary-text text-sm px-3 py-1.5 rounded-lg border border-hover/50 shadow-lg backdrop-blur-sm">
                            {techName}
                          </div>
                        </Popover>
                        {index < p.technologies.length - 1 && (
                          <span className="text-sm text-theme-color/20 group-hover:text-theme-color/40 transition-colors duration-200 hidden sm:inline">•</span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full/2 border border-dashed border-subtle mx-5 md:mx-10"></div>
        </a>
      ))}

      {selectedProject && (
        <Modal isOpen={!!selectedProject} onClose={closeModal}>
          <div>
            <div className="mb-6">
              <h3 className="flex text-3xl font-bold text-theme-color">{selectedProject.title}</h3>
              <p className="text-sm opacity-70 mt-3 text-theme-color/50">• {selectedProject.date} •</p>
            </div>

            <p className="text-primary-text text-1xl mb-8">{selectedProject.description}</p>

            <hr className="border-t border-hover my-8" />

            <div className="mb-8">
              <strong className="text-xl text-theme-color block mb-4">{t("Technologies Used")}</strong>
              <div className="flex flex-wrap gap-4 items-center">
                {selectedProject.technologies.map((techName) => {
                  const icon = getTechIconForProject(techName, 'text-2xl');
                  return (
                    <div
                      key={techName}
                      className="flex items-center gap-3 bg-hover/50 hover:bg-hover/80 p-3 rounded-lg transition-all duration-200 border border-hover/30 hover:border-theme-color/30"
                    >
                      <div className="flex items-center justify-center w-8 h-8 bg-main/20 rounded-md">
                        {icon || (
                          <span className="text-sm text-theme-color/80 font-mono">
                            {techName.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2)}
                          </span>
                        )}
                      </div>
                      <span className="text-primary-text text-sm font-medium">
                        {techName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-6 mt-10">
              <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="bg-theme-color/10 text-white py-3 px-8 rounded-lg text-1xl cursor-pointer border-theme-color border hover:bg-theme-color/60 transition">
                {t("View Project")}
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Projects;