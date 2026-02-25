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
      slug: "live-desktop-captions",
      title: t("live-desktop-captions - Real-time Translation and Subtitles for Desktop"),
      date: "06/20/2025",
      technologies: ["Python"],
      description: t2("live-desktop-captions is a desktop application for real-time voice transcription and translation built with Python. It captures your voice via microphone or computer audio, transcribes it using Whisper, and also translates it to other languages."),
      url: "https://github.com/vmx2f/live-desktop-captions"
    },
    {
      slug: "nawi-app",
      title: t("Ñawi Mobile and Web App"),
      date: "05/20/2024",
      technologies: ["Flutter", "Figma", "React", "TypeScript", "Next", "Tailwind"],
      description: t2("A student report management application developed for Android and web."),
      url: "https://github.com/4dominic888/NawiApp"
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
      description: t2("A demo made in Godot in collaboration with StraGeo Studios for Brackeys GameJam 2025 - 1."),
      url: "https://github.com/Brackeys-GJ/they-are-watching"
    },
    {
      slug: "movie-search",
      title: t("movie-search"),
      date: "01/10/2025",
      technologies: ["React", "TypeScript", "Tailwind"],
      description: t2("A simple application to search for movies using the TMDB API."),
      url: "https://github.com/vmx2f/movie-search"
    },
    {
      slug: "recomendations-algorithm",
      title: t("recomendations-algorithm"),
      date: "01/10/2025",
      technologies: ["Python"],
      description: t2("A console only project on Python about a store where you get recomendations based on your purchases."),
      url: "https://github.com/vmx2f/recomendations-algorithm"
    },
    {
      slug: "notes-app-java",
      title: t("notes-app-java"),
      date: "07/13/2023",
      technologies: ["Java"],
      description: t2("A minimalist and opinionated daily task organization application made in Java."),
      url: "https://github.com/vmx2f/notes-app-java"
    },
    {
      slug: "flappy-bird-unity",
      title: t("flappy-bird-unity"),
      date: "07/13/2023",
      technologies: ["Unity", "C#"],
      description: t2("Recreation of the game Flappy Bird made on unity for desktop"),
      url: "https://github.com/vmx2f/flappy-bird-recreation"
    },
    {
      slug: "platformer-game",
      title: t("platformer-game"),
      date: "07/13/2023",
      technologies: ["Unity", "C#"],
      description: t2("Demo platformer game called Aura."),
      url: "https://github.com/vmx2f/platformer-game"
    }
  ];
}
