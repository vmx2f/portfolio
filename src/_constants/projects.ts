"use client";

import { useExtracted } from "next-intl";

export interface Project {
  slug: string;
  title: string;
  date: string;
  technologies: string[];
  description: string;
  url: string;
}

export function useProjectsData(): Project[] {
  const t = useExtracted('projects.title');
  const t2 = useExtracted('projects.description');
  
  return [
    {
      slug: "amoled-dark-theme-arch-linux",
      title: t("Amoled Dark Theme for Arch Linux with Hyprland"),
      date: "05/20/2025",
      technologies: ["Linux", "CSS"],
      description: t2("An elegant collection of dotfiles created for Arch Linux, my love letter to AMOLED aesthetics."),
      url: "https://github.com/vmx2f/.arch-dot-files"
    },
    {
      slug: "lively-captions",
      title: t("Lively Captions - Real-time Translation and Subtitles for Desktop"),
      date: "06/20/2025",
      technologies: ["Python"],
      description: t2("Lively Captions is a desktop application for real-time voice transcription and translation built with Python. It captures your voice via microphone or computer audio, transcribes it using Whisper, and also translates it to other languages."),
      url: "https://github.com/vmx2f/Lively-Captions"
    },
    {
      slug: "nawi-app",
      title: t("Ñawi Mobile and Web App"),
      date: "05/20/2024",
      technologies: ["Flutter", "Figma", "React", "TypeScript", "Next", "Tailwind"],
      description: t2("A student report management application developed for Android and web."),
      url: "https://github.com/PlaceOrg/Map-ly"
    },
    {
      slug: "minimal-terminal-config",
      title: t("Minimal Script for Windows Terminal Configuration"),
      date: "08/16/2025",
      technologies: ["PowerShell"],
      description: t2("A minimalist PowerShell script to configure Windows Terminal with a custom theme, font, and settings."),
      url: "https://github.com/vmx2f/minimal-terminal-config"
    },
    {
      slug: "they-are-watching-game",
      title: t("They are watching (Game)"),
      date: "02/26/2025",
      technologies: ["Godot", "Git"],
      description: t2("A small game demo made in Godot in collaboration with StraGeo Studios for Brackeys GameJam 2025 - 1."),
      url: "https://github.com/Brackeys-GJ/TAW_Game"
    },
    {
      slug: "movie-fy",
      title: t("Movie-fy"),
      date: "01/10/2025",
      technologies: ["React", "TypeScript", "Tailwind"],
      description: t2("A simple application to search for movies using the TMDB API."),
      url: "https://github.com/vmx2f/Movie-fy"
    },
    {
      slug: "unixpec",
      title: t("UnixPec"),
      date: "07/13/2023",
      technologies: ["Java"],
      description: t2("A minimalist and opinionated daily task organization application made in Java."),
      url: "https://github.com/vmx2f/Unix-Pec"
    },
    {
      slug: "map-ly",
      title: t("Map-ly"),
      date: "12/20/2024",
      technologies: ["Angular", "TypeScript"],
      description: t2("A demo map application to mark dangerous areas based on reliable sources."),
      url: "https://github.com/PlaceOrg/Map-ly"
    }
  ];
}
