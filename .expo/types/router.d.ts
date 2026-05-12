/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/data/studyFlashcards`; params?: Router.UnknownInputParams; } | { pathname: `/screens/LibraryScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/ProfileScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/StudyScreen`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/data/studyFlashcards`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/LibraryScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/ProfileScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/StudyScreen`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/data/studyFlashcards${`?${string}` | `#${string}` | ''}` | `/screens/LibraryScreen${`?${string}` | `#${string}` | ''}` | `/screens/ProfileScreen${`?${string}` | `#${string}` | ''}` | `/screens/StudyScreen${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/data/studyFlashcards`; params?: Router.UnknownInputParams; } | { pathname: `/screens/LibraryScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/ProfileScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/StudyScreen`; params?: Router.UnknownInputParams; };
    }
  }
}
