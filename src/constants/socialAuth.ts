export type SocialAuthProvider = {
  id: string;
  title: string;
  icon: string;
};

export const socialAuthProviders: SocialAuthProvider[] = [
  {
    id: "livejournal",
    title: "LiveJournal",
    icon: "/images/socials/livejournal.png",
  },
  {
    id: "mailru",
    title: "Mail.ru",
    icon: "/images/socials/mailru.png",
  },
  {
    id: "liveinternet",
    title: "LiveInternet",
    icon: "/images/socials/liveinternet.png",
  },
  {
    id: "blogger",
    title: "Blogger",
    icon: "/images/socials/blogger.png",
  },
  {
    id: "openid",
    title: "OpenID",
    icon: "/images/socials/openid.png",
  },
];
