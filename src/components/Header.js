// Routes
import { Link } from 'react-router-dom';
import React, { useState , useContext} from 'react';

// Components
import { useTranslation } from 'react-i18next';
import SearchBar from './SearchBar';

// Radix Imports
import {
  Root,
  Item,
  Trigger,
  Content,
  Link as RadixLink,
} from '@radix-ui/react-navigation-menu';

// Icons
import { useAuth } from '../hooks/useAuth';

import {UserContext} from '../App'

const Header = ({ search, setSearch, betaVersion }) => {
  const { signOutUser } = useAuth();
  const {user, userObject} = useContext(UserContext)

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  let [isShowing, setIsShowing] = useState(true)

  return (
    <header>
      <Root id="navbar" className='flex justify-between lg:justify-center items-center px-6 lg:px-12 min-h-16'>
        <ul className="lg:flex items-center gap-6 hidden min-w-max basis-0 grow menuInside shrink-0 overflow-visible">
          <Link
            to='/' className="flex items-start gap-1 min-w-fit min-h-fit select-none group/anchor">
            <svg
              className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreendark"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
              <path
                d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
            </svg>
            <p
              className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreenlight min-w-max font-a-anchor font-semibold text-base text-nbgreendark leading-5 tracking-tight transition-all">
              {t("navbar.competition")}</p>
          </Link>
          <Link
            to='/events' className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
            <svg
              className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreendark"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
              <path
                d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
            </svg>
            <p
              className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreenlight min-w-max font-a-anchor font-semibold text-base text-nbgreendark leading-5 tracking-tight transition-all">
              {t("navbar.events")}</p>
          </Link>
          <Link
            to='/films'
            className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit pointer-events-none select-none group/anchor">
            <svg
              className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreenlight"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
              <path
                d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
            </svg>
            <p
              className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreenlight min-w-max font-a-anchor font-semibold text-base text-nbgreenlight leading-5 tracking-tight transition-all">
              {t("navbar.films")}</p>
          </Link>
          {!user && (
            <Link
              to='/search'
              className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
              <svg
                className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all fill-nbgreendark"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                <path
                  d="M5.2029 0.500827C2.33387 0.500827 0 2.8347 0 5.70372C0 8.57275 2.33387 10.9066 5.2029 10.9066C6.07996 10.9066 6.94215 10.6985 7.67056 10.2971C7.7289 10.3674 7.79359 10.432 7.86381 10.4904L9.35035 11.9769C9.48761 12.1314 9.655 12.2562 9.84222 12.3436C10.0295 12.431 10.2326 12.4792 10.4391 12.4853C10.6457 12.4914 10.8513 12.4552 11.0433 12.3789C11.2354 12.3027 11.4098 12.188 11.5559 12.0419C11.702 11.8957 11.8167 11.7213 11.893 11.5293C11.9692 11.3372 12.0054 11.1316 11.9993 10.9251C11.9933 10.7185 11.945 10.5154 11.8576 10.3282C11.7702 10.141 11.6454 9.97357 11.491 9.83631L10.0044 8.34977C9.93201 8.27733 9.85231 8.21257 9.76658 8.15652C10.1679 7.42811 10.4207 6.58078 10.4207 5.68886C10.4207 2.81983 8.08679 0.485962 5.21776 0.485962L5.2029 0.500827ZM5.2029 1.98737C7.26919 1.98737 8.91925 3.63743 8.91925 5.70372C8.91925 6.68484 8.56248 7.59163 7.93813 8.26058C7.92327 8.27544 7.9084 8.29031 7.89354 8.30517C7.82332 8.36352 7.75863 8.42821 7.70029 8.49842C7.04621 9.09304 6.15428 9.43494 5.18803 9.43494C3.12174 9.43494 1.47168 7.78488 1.47168 5.71859C1.47168 3.6523 3.12174 2.00223 5.18803 2.00223L5.2029 1.98737Z" />
              </svg>
              {/* <p
                className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreenlight min-w-max font-a-anchor font-semibold text-base text-nbgreendark leading-5 tracking-tight transition-all">
                {t("navbar.search")}</p> */}
            </Link>
          )}
          {user && (
            <div
              // to='/'
              className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor overflow-visible">
              <Link to='/search'>
                <svg
                  className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreendark h-3 translate-y-1 transition-all fill-nbgreendark"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                  <path
                    d="M5.2029 0.500827C2.33387 0.500827 0 2.8347 0 5.70372C0 8.57275 2.33387 10.9066 5.2029 10.9066C6.07996 10.9066 6.94215 10.6985 7.67056 10.2971C7.7289 10.3674 7.79359 10.432 7.86381 10.4904L9.35035 11.9769C9.48761 12.1314 9.655 12.2562 9.84222 12.3436C10.0295 12.431 10.2326 12.4792 10.4391 12.4853C10.6457 12.4914 10.8513 12.4552 11.0433 12.3789C11.2354 12.3027 11.4098 12.188 11.5559 12.0419C11.702 11.8957 11.8167 11.7213 11.893 11.5293C11.9692 11.3372 12.0054 11.1316 11.9993 10.9251C11.9933 10.7185 11.945 10.5154 11.8576 10.3282C11.7702 10.141 11.6454 9.97357 11.491 9.83631L10.0044 8.34977C9.93201 8.27733 9.85231 8.21257 9.76658 8.15652C10.1679 7.42811 10.4207 6.58078 10.4207 5.68886C10.4207 2.81983 8.08679 0.485962 5.21776 0.485962L5.2029 0.500827ZM5.2029 1.98737C7.26919 1.98737 8.91925 3.63743 8.91925 5.70372C8.91925 6.68484 8.56248 7.59163 7.93813 8.26058C7.92327 8.27544 7.9084 8.29031 7.89354 8.30517C7.82332 8.36352 7.75863 8.42821 7.70029 8.49842C7.04621 9.09304 6.15428 9.43494 5.18803 9.43494C3.12174 9.43494 1.47168 7.78488 1.47168 5.71859C1.47168 3.6523 3.12174 2.00223 5.18803 2.00223L5.2029 1.98737Z" />
                </svg></Link>
              <SearchBar search={search} setSearch={setSearch} />
            </div>
          )}
        </ul>
        <Link
          to='/' id="nbLogo" className="flex justify-center items-end gap-2 mr-4 lg:ml-6 transition-all shrink group/active">
          <svg className="w-12 h-8 group/logo logoVectors2 shrink-0" xmlns="http://www.w3.org/2000/svg">
            <path className="group-hover/logo:fill-nbgreendark group-active/active:fill-nbgreenmain fill-nbgreenmain"
              d="M0.647461 16.1046H4.4444V18.5788L7.02756 16.1046H12.0383L15.4929 19.4135V30.95H11.3847V20.4867L10.3265 19.4433H7.71226L4.75562 22.3051V30.95H0.647461V16.1046Z" />
            <path className="group-hover/logo:fill-nbgreenmain group-active/active:fill-nbgreenmain fill-nbgreendark"
              d="M5.01861 14.8673H0.647461V10.4631L3.68252 7.42806L0.647461 4.393V0.0218506H5.0516L8.07016 3.04042L11.0887 0.0218506H15.4929V4.393L12.4578 7.42806L15.4929 10.4631V14.8673H11.1217L8.07016 11.8157L5.01861 14.8673Z" />
            <path className="group-hover/logo:fill-nbgreenmain group-active/active:fill-nbgreenmain fill-nbgreendark"
              d="M37.1836 30.95H32.8125V26.5459L35.8476 23.5108L32.8125 20.4758V16.1046H37.2166L40.2352 19.1232L43.2538 16.1046H47.6579V20.4758L44.6228 23.5108L47.6579 26.5459V30.95H43.2868L40.2352 27.8985L37.1836 30.95Z" />
            <path className="group-hover/logo:fill-nbgreendark group-active/active:fill-nbgreenmain fill-nbgreenmain"
              d="M16.7295 27.7064V9.50659H20.7287V18.0659L22.9403 15.9937H28.4543L31.5749 19.1171V27.8266L28.4543 30.95H19.9712L16.7295 27.7064ZM26.4245 27.5863L27.5757 26.415V20.5286L26.4245 19.3573H23.4554L20.7287 22.0603V26.415L21.8799 27.5863H26.4245Z" />
            <path className="group-hover/logo:fill-nbgreenmain group-active/active:fill-nbgreenmain fill-nbgreendark"
              d="M19.7646 7.4283L16.7295 4.39324V0.0220947H21.1336L24.1522 3.04066L27.1708 0.0220947H31.5749V4.39324L28.5398 7.4283L31.5749 10.4634V14.8675H27.2037L24.1522 11.8159L19.7646 7.4283Z" />
            <path className="group-hover/logo:fill-nbgreendark group-active/active:fill-nbgreenmain fill-nbgreenmain"
              d="M35.8644 7.44473L32.8128 10.4963L37.1675 14.8674L40.252 11.8324L43.2871 14.8674L47.6582 10.4633L44.6396 7.44473L47.6582 4.42616L43.2871 0.0220277L40.252 3.05709L37.2169 0.0220272L32.8128 4.35194L35.8644 7.44473Z" />
          </svg>
          <svg className="w-16 h-7 group/logotext logoTextVectors2 shrink-0" xmlns="http://www.w3.org/2000/svg">
            <g className="group-hover/logotext:fill-nbgreenmain group-active/active:fill-nbgreenmain fill-nbgreendark">
              <path
                d="M36.2686 0.496582H38.8092V2.22504L40.4752 0.496582H43.4323V2.82896H41.0374L39.0174 4.91144V10.8673H36.2686V0.496582Z" />
              <path
                d="M24.3945 8.95145V6.57743L26.3104 4.66154H31.5791V3.34958L30.9335 2.70401H27.8098L27.1851 3.34958V3.93268H24.4778V2.74566L26.7061 0.496582H32.0581L34.2863 2.74566V10.8673H31.8082V9.38877L30.2671 10.8673H26.3104L24.3945 8.95145ZM30.0797 8.74321L31.5791 7.30629V6.61907H27.664L27.1018 7.18134V8.22258L27.6224 8.74321H30.0797Z" />
              <path
                d="M12.3574 8.74321V2.66236L14.5024 0.496582H20.3541L22.5199 2.66236V6.59825H15.1063V7.93104L15.7727 8.61826H19.1671L19.7919 7.97269V7.43124H22.4991V8.78485L20.4374 10.8673H14.4607L12.3574 8.74321ZM19.7711 4.68237V3.47453L19.063 2.74566H15.8143L15.1063 3.47453V4.68237H19.7711Z" />
              <path
                d="M0.658203 0.496582H3.19883V2.22504L4.92729 0.496582H8.28008L10.5916 2.80814V10.8673H7.84276V3.55783L7.13472 2.82896H5.38543L3.40708 4.82814V10.8673H0.658203V0.496582Z" />
            </g>
            <g className="group-hover/logotext:fill-nbgreenmain group-active/active:fill-nbgreenmain fill-nbgreendark">
              <path
                d="M52.4199 16.5792H54.9605V18.3077L56.689 16.5792H60.0418L62.3534 18.8908V26.95H59.6045V19.6405L58.8964 18.9116H57.1472L55.1688 20.9108V26.95H52.4199V16.5792Z" />
              <path
                d="M40.5459 25.0341V22.6601L42.4618 20.7442H47.7305V19.4322L47.0849 18.7867H43.9612L43.3364 19.4322V20.0153H40.6292V18.8283L42.8575 16.5792H48.2094L50.4377 18.8283V26.95H47.9595V25.4714L46.4185 26.95H42.4618L40.5459 25.0341ZM46.2311 24.8258L47.7305 23.3889V22.7017H43.8154L43.2531 23.264V24.3052L43.7737 24.8258H46.2311Z" />
              <path
                d="M29.4492 12.0811H32.1981V20.3902H34.0098L36.6546 16.5792H39.695L36.2381 21.5772L39.9033 26.95H36.8629L33.9474 22.7225H32.1981V26.95H29.4492V12.0811Z" />
              <path d="M24.5195 12.0811H27.2684V26.95H24.5195V12.0811Z" />
              <path
                d="M12.541 25.0341V22.6601L14.4569 20.7442H19.7256V19.4322L19.08 18.7867H15.9563L15.3315 19.4322V20.0153H12.6243V18.8283L14.8526 16.5792H20.2045L22.4328 18.8283V26.95H19.9546V25.4714L18.4136 26.95H14.4569L12.541 25.0341ZM18.2262 24.8258L19.7256 23.3889V22.7017H15.8105L15.2482 23.264V24.3052L15.7689 24.8258H18.2262Z" />
              <path
                d="M0.658203 24.7009V12.0811H3.40708V18.0161L4.92729 16.5792H8.7174L10.8624 18.745V24.7842L8.7174 26.95H2.88646L0.658203 24.7009ZM7.32214 24.6176L8.11348 23.8054V19.7238L7.32214 18.9116H5.28131L3.40708 20.7858V23.8054L4.19842 24.6176H7.32214Z" />
            </g>
          </svg>
        </Link>
        <ul className='min-w-max basis-0 grow profileMenuInside shrink-0'>
          {!user && (
            <Item>
              <div className='flex justify-end items-center gap-4'>
                {/* <h5 className="hidden lg:block font-h3-subtitle font-normal text-nbgreydark text-xs italic select-none pointer-events-none">{betaVersion}</h5> */}
                <Trigger>
                  <button type="button" id="menu-button" aria-expanded="true" aria-haspopup="true"
                    className="flex items-end gap-1 min-w-fit min-h-fit select-none group/button">
                    <svg
                      className="group-hover/button:fill-nbgreenmain group-active/button:fill-nbgreenlight group-disabled/button:fill-nbgreenlight transition-all fill-nbgreydark"
                      xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
                      <path
                        d="M0.539062 0.186279V1.99394H15.0003V0.186279H0.539062ZM0.539062 5.55503V7.36269H15.0003V5.55503H0.539062ZM0.539062 10.978V12.7857H15.0003V10.978H0.539062Z" />
                    </svg>
                  </button>
                </Trigger>
                <div className='lg:inline-flex items-baseline gap-0.5 hidden'>
                {i18n.language === 'hu' && (
                        <button onClick={() => changeLanguage("en")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            hu</p>
                        </button>
                      )}
                      {i18n.language === 'en' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("fr")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            en</p>
                        </button>
                      )}
                      {i18n.language === 'fr' && (
                        <button onClick={() => changeLanguage("it")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            fr</p>
                        </button>
                      )}
                      {i18n.language === 'it' && (
                        <button onClick={() => changeLanguage("de")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            it</p>
                        </button>
                      )}
                      {i18n.language === 'de' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("bg")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            de</p>
                        </button>
                      )}
                      {i18n.language === 'bg' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("tr")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            bg</p>
                        </button>
                      )}
                      {i18n.language === 'tr' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("Ω")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            tr</p>
                        </button>
                      )}
                      {i18n.language === 'Ω' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("hu")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            Ω</p>
                        </button>
                      )}
                </div>
              </div>
              <Content id="navbarDropdown" className='top-16 lg:right-0 left-0 lg:left-auto z-50 absolute flex flex-col justify-center items-start bg-nbgreylight shadow-md lg:mt-2.5 lg:mr-12 px-6 lg:px-5 lg:py-4 pb-3 lg:rounded-lg w-full lg:max-w-max'>
                <div role="none"
                  id="navbarDropdownInsideDesktop" className="lg:flex flex-col justify-center items-start gap-1.5 hidden divide-y-2 divide-solid divide-nbgreymain w-full">
                  <ul role="none"
                    id="navbarDropdownProfileInsideLoggedOut" className="lg:flex flex-col justify-center items-start gap-1.5 hidden py-1 w-full">
                    <RadixLink>
                      <Link
                        to='/login' role="menuitem" tabindex="-1" id="menu-item-0"
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreydark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                          {t("navbar.login")}</p>
                      </Link>
                    </RadixLink>
                    <RadixLink>
                      <Link
                        to='/register' role="menuitem" tabindex="-1" id="menu-item-1"
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreydark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                          {t("navbar.register")}</p>
                      </Link>
                    </RadixLink>
                  </ul>
                </div>
                <div role="none"
                  id="navbarDropdownInsideMobile" className="flex flex-col justify-center items-start lg:hidden divide-y-2 divide-solid divide-nbgreymain w-full">
                  <ul role="none"
                    className="flex flex-col justify-center items-start gap-2.5 lg:hidden py-4 w-full navbarDropdownMenuInside">
                    <RadixLink>
                      <Link
                        to='/' className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreendark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreenlight min-w-max font-a-anchor font-semibold text-base text-nbgreendark leading-5 tracking-tight transition-all">
                          {t("navbar.competition")}</p>
                      </Link>
                    </RadixLink>
                    <RadixLink>
                      <Link
                        to='/events'
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreendark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreenlight min-w-max font-a-anchor font-semibold text-base text-nbgreendark leading-5 tracking-tight transition-all">
                          {t("navbar.events")}</p>
                      </Link>
                    </RadixLink>
                    <RadixLink>
                      <Link
                        to='/films'
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit pointer-events-none select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreenlight"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreenlight min-w-max font-a-anchor font-semibold text-base text-nbgreenlight leading-5 tracking-tight transition-all">
                          {t("navbar.films")}</p>
                      </Link>
                    </RadixLink>
                    <RadixLink>
                      <Link
                        to='/search'
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreendark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M5.2029 0.500827C2.33387 0.500827 0 2.8347 0 5.70372C0 8.57275 2.33387 10.9066 5.2029 10.9066C6.07996 10.9066 6.94215 10.6985 7.67056 10.2971C7.7289 10.3674 7.79359 10.432 7.86381 10.4904L9.35035 11.9769C9.48761 12.1314 9.655 12.2562 9.84222 12.3436C10.0295 12.431 10.2326 12.4792 10.4391 12.4853C10.6457 12.4914 10.8513 12.4552 11.0433 12.3789C11.2354 12.3027 11.4098 12.188 11.5559 12.0419C11.702 11.8957 11.8167 11.7213 11.893 11.5293C11.9692 11.3372 12.0054 11.1316 11.9993 10.9251C11.9933 10.7185 11.945 10.5154 11.8576 10.3282C11.7702 10.141 11.6454 9.97357 11.491 9.83631L10.0044 8.34977C9.93201 8.27733 9.85231 8.21257 9.76658 8.15652C10.1679 7.42811 10.4207 6.58078 10.4207 5.68886C10.4207 2.81983 8.08679 0.485962 5.21776 0.485962L5.2029 0.500827ZM5.2029 1.98737C7.26919 1.98737 8.91925 3.63743 8.91925 5.70372C8.91925 6.68484 8.56248 7.59163 7.93813 8.26058C7.92327 8.27544 7.9084 8.29031 7.89354 8.30517C7.82332 8.36352 7.75863 8.42821 7.70029 8.49842C7.04621 9.09304 6.15428 9.43494 5.18803 9.43494C3.12174 9.43494 1.47168 7.78488 1.47168 5.71859C1.47168 3.6523 3.12174 2.00223 5.18803 2.00223L5.2029 1.98737Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreenlight min-w-max font-a-anchor font-semibold text-base text-nbgreendark leading-5 tracking-tight transition-all">
                          {t("navbar.search")}</p>
                      </Link>
                    </RadixLink>
                  </ul>
                  <ul role="none"
                    id="navbarDropdownProfileInsideLoggedOut" className="flex flex-col justify-center items-start gap-2.5 lg:hidden py-4 w-full">
                    <RadixLink>
                      <Link
                        to='/login' role="menuitem" tabindex="-1" id="menu-item-0"
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreydark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                          {t("navbar.login")}</p>
                      </Link>
                    </RadixLink>
                    <RadixLink>
                      <Link
                        to='/register' role="menuitem" tabindex="-1" id="menu-item-1"
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreydark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                          {t("navbar.register")}</p>
                      </Link>
                    </RadixLink>
                    <div className='inline-flex items-baseline gap-0.5 justify-between w-full'>
                      {i18n.language === 'hu' && (
                        <button onClick={() => changeLanguage("en")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            hu</p>
                        </button>
                      )}
                      {i18n.language === 'en' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("fr")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            en</p>
                        </button>
                      )}
                      {i18n.language === 'fr' && (
                        <button onClick={() => changeLanguage("it")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            fr</p>
                        </button>
                      )}
                      {i18n.language === 'it' && (
                        <button onClick={() => changeLanguage("de")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            it</p>
                        </button>
                      )}
                      {i18n.language === 'de' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("bg")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            de</p>
                        </button>
                      )}
                      {i18n.language === 'bg' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("tr")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            bg</p>
                        </button>
                      )}
                      {i18n.language === 'tr' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("Ω")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            tr</p>
                        </button>
                      )}
                      {i18n.language === 'Ω' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("hu")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            Ω</p>
                        </button>
                      )}
                      {/* <h5 className="block font-h3-subtitle font-normal text-nbgreydark text-xs italic select-none pointer-events-none">{betaVersion}</h5> */}
                    </div>
                  </ul>
                </div>
              </Content>
            </Item>
          )}
          {user && (
            <Item>
              <div className='flex justify-end items-center gap-4'>
                {/* <h5 className="hidden lg:block font-h3-subtitle font-normal text-nbgreydark text-xs italic select-none pointer-events-none">{betaVersion}</h5> */}
                {user.photoURL || userObject?.profilePicture ? (
                  <Trigger className='flex items-center gap-2'>
                    <img
                      src={userObject?.profilePicture || user?.photoURL}
                      alt='user'
                      className='lg:block hidden max-h-7 max-w-7 w-full h-full rounded-full min-h-7 min-w-7 aspect-1'
                    />
                    <button type="button" id="menu-button" aria-expanded="true" aria-haspopup="true"
                      className="flex items-end gap-1 lg:hidden min-w-fit min-h-fit select-none group/button">
                      <svg
                        className="group-hover/button:fill-nbgreenmain group-active/button:fill-nbgreenlight group-disabled/button:fill-nbgreenlight transition-all fill-nbgreydark"
                        xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
                        <path
                          d="M0.539062 0.186279V1.99394H15.0003V0.186279H0.539062ZM0.539062 5.55503V7.36269H15.0003V5.55503H0.539062ZM0.539062 10.978V12.7857H15.0003V10.978H0.539062Z" />
                      </svg>
                    </button>
                  </Trigger>
                ) : (
                  <>
                    <Trigger className='flex items-center gap-2'>
                      <button type="button" id="menu-button" aria-expanded="true" aria-haspopup="true"
                        className="lg:flex justify-center items-end gap-1 hidden bg-nbgreydark hover:bg-nbgreenmain active:bg-nbgreenlight disabled:bg-nbgreymiddark rounded-full w-7 min-w-fit h-7 min-h-fit overflow-hidden select-none group/button">
                        <div className="">
                          <svg
                            className="group-hover/button:fill-nbgreenlight group-active/button:fill-nbgreenmain group-disabled/button:fill-nbgreymain transition-all fill-nbgreymain"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M11.7571 0.951111C8.62515 0.951111 6.06264 4.14002 6.06264 8.0692C6.06264 11.9984 8.62515 15.1873 11.7571 15.1873C14.8891 15.1873 17.4516 11.9984 17.4516 8.0692C17.4516 4.14002 14.8891 0.951111 11.7571 0.951111ZM5.80639 15.1873C2.78832 15.3297 0.368164 17.8068 0.368164 20.8818V23.729H23.1461V20.8818C23.1461 17.8068 20.7544 15.3297 17.7078 15.1873C16.1703 16.9241 14.0634 18.0345 11.7571 18.0345C9.45085 18.0345 7.3439 16.9241 5.80639 15.1873Z" />
                          </svg>
                        </div>
                      </button>
                      <button type="button" id="menu-button" aria-expanded="true" aria-haspopup="true"
                        className="flex items-end gap-1 lg:hidden min-w-fit min-h-fit select-none group/button">
                        <svg
                          className="group-hover/button:fill-nbgreenmain group-active/button:fill-nbgreenlight group-disabled/button:fill-nbgreenlight transition-all fill-nbgreydark"
                          xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
                          <path
                            d="M0.539062 0.186279V1.99394H15.0003V0.186279H0.539062ZM0.539062 5.55503V7.36269H15.0003V5.55503H0.539062ZM0.539062 10.978V12.7857H15.0003V10.978H0.539062Z" />
                        </svg>
                      </button>
                    </Trigger>
                  </>
                )}
                <div className='lg:inline-flex items-baseline gap-0.5 hidden'>
                {i18n.language === 'hu' && (
                        <button onClick={() => changeLanguage("en")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            hu</p>
                        </button>
                      )}
                      {i18n.language === 'en' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("fr")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            en</p>
                        </button>
                      )}
                      {i18n.language === 'fr' && (
                        <button onClick={() => changeLanguage("it")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            fr</p>
                        </button>
                      )}
                      {i18n.language === 'it' && (
                        <button onClick={() => changeLanguage("de")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            it</p>
                        </button>
                      )}
                      {i18n.language === 'de' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("bg")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            de</p>
                        </button>
                      )}
                      {i18n.language === 'bg' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("tr")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            bg</p>
                        </button>
                      )}
                      {i18n.language === 'tr' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("Ω")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            tr</p>
                        </button>
                      )}
                      {i18n.language === 'Ω' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("hu")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            Ω</p>
                        </button>
                      )}
                </div>
              </div>
              <Content id="navbarDropdown" className='top-16 lg:right-0 left-0 lg:left-auto z-50 absolute flex flex-col justify-center items-start bg-nbgreylight shadow-md lg:mt-2.5 lg:mr-12 px-6 lg:px-5 lg:py-4 pb-3 lg:rounded-lg w-full lg:max-w-max'>
                <div role="none"
                  id="navbarDropdownInsideDesktop" className="lg:flex flex-col justify-center items-start gap-1.5 hidden divide-y-2 divide-solid divide-nbgreymain w-full">
                  {user.displayName && (<ul role="none"
                    id="navbarDropdownProfileNameLoggedIn" className="lg:flex flex-col justify-center items-start hidden pb-1 w-full select-none">
                    <h3
                      className="w-fit max-w-32 font-bold font-h2-title text-base text-left text-nbgreymain leading-5 tracking-tight">
                      {user.displayName}</h3>
                  </ul>)}
                  <ul role="none"
                    className="lg:flex flex-col justify-center items-start gap-1.5 hidden py-2 w-full navbarDropdownProfileInsideLoggedIn">
                    <RadixLink>
                      <Link
                        to='/profile' role="menuitem" tabindex="-1" id="menu-item-1"
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreydark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                          {t("navbar.profile")}</p>
                      </Link>
                    </RadixLink>
                    {userObject && userObject.userType === 'creator' &&
                      <>
                        <RadixLink>
                          <Link
                            to='/upload-demo' role="menuitem" tabindex="-1" id="menu-item-1"
                            className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                            <svg
                              className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreydark"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                              <path
                                d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                            </svg>
                            <p
                              className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                              {t("navbar.upload_demo")}</p>
                          </Link>
                        </RadixLink>
                        <RadixLink>
                          <Link
                            to='/upload-event' role="menuitem" tabindex="-1" id="menu-item-1"
                            className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                            <svg
                              className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreydark"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                              <path
                                d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                            </svg>
                            <p
                              className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                              {t("navbar.upload_event")}</p>
                          </Link>
                        </RadixLink>
                      </>}
                    <RadixLink>
                      <Link
                        to='/favourites' role="menuitem" tabindex="-1" id="menu-item-1"
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreydark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                          {t("navbar.favourites")}</p>
                      </Link>
                    </RadixLink>
                    <RadixLink>
                      <a onClick={signOutUser} role="menuitem" tabindex="-1" id="menu-item-1"
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit cursor-pointer select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreydark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                          {t("navbar.logout")}</p>
                      </a>
                    </RadixLink>
                  </ul>
                </div>
                <div role="none"
                  id="navbarDropdownInsideMobile" className="flex flex-col justify-center items-start lg:hidden divide-y-2 divide-solid divide-nbgreymain w-full">
                  <ul role="none"
                    id="navbarDropdownMenuInside" className="flex flex-col justify-center items-start gap-2.5 lg:hidden py-4 w-full">
                    <RadixLink>
                      <Link
                        to='/' className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreendark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreenlight min-w-max font-a-anchor font-semibold text-base text-nbgreendark leading-5 tracking-tight transition-all">
                          {t("navbar.competition")}</p>
                      </Link>
                    </RadixLink>
                    <RadixLink>
                      <Link
                        to='/events'
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreendark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreenlight min-w-max font-a-anchor font-semibold text-base text-nbgreendark leading-5 tracking-tight transition-all">
                          {t("navbar.events")}</p>
                      </Link>
                    </RadixLink>
                    <RadixLink>
                      <Link
                        to='/films'
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit pointer-events-none select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreenlight"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreenlight min-w-max font-a-anchor font-semibold text-base text-nbgreenlight leading-5 tracking-tight transition-all">
                          {t("navbar.films")}</p>
                      </Link>
                    </RadixLink>
                    <RadixLink>
                      <Link
                        to='/search'
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreendark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M5.2029 0.500827C2.33387 0.500827 0 2.8347 0 5.70372C0 8.57275 2.33387 10.9066 5.2029 10.9066C6.07996 10.9066 6.94215 10.6985 7.67056 10.2971C7.7289 10.3674 7.79359 10.432 7.86381 10.4904L9.35035 11.9769C9.48761 12.1314 9.655 12.2562 9.84222 12.3436C10.0295 12.431 10.2326 12.4792 10.4391 12.4853C10.6457 12.4914 10.8513 12.4552 11.0433 12.3789C11.2354 12.3027 11.4098 12.188 11.5559 12.0419C11.702 11.8957 11.8167 11.7213 11.893 11.5293C11.9692 11.3372 12.0054 11.1316 11.9993 10.9251C11.9933 10.7185 11.945 10.5154 11.8576 10.3282C11.7702 10.141 11.6454 9.97357 11.491 9.83631L10.0044 8.34977C9.93201 8.27733 9.85231 8.21257 9.76658 8.15652C10.1679 7.42811 10.4207 6.58078 10.4207 5.68886C10.4207 2.81983 8.08679 0.485962 5.21776 0.485962L5.2029 0.500827ZM5.2029 1.98737C7.26919 1.98737 8.91925 3.63743 8.91925 5.70372C8.91925 6.68484 8.56248 7.59163 7.93813 8.26058C7.92327 8.27544 7.9084 8.29031 7.89354 8.30517C7.82332 8.36352 7.75863 8.42821 7.70029 8.49842C7.04621 9.09304 6.15428 9.43494 5.18803 9.43494C3.12174 9.43494 1.47168 7.78488 1.47168 5.71859C1.47168 3.6523 3.12174 2.00223 5.18803 2.00223L5.2029 1.98737Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreenlight min-w-max font-a-anchor font-semibold text-base text-nbgreendark leading-5 tracking-tight transition-all">
                          {t("navbar.search")}</p>
                      </Link>
                    </RadixLink>
                  </ul>
                  <ul role="none"
                    className="flex flex-col justify-center items-start gap-2.5 lg:hidden py-4 w-full navbarDropdownProfileInsideLoggedIn">
                    <RadixLink>
                      <Link
                        to='/profile' role="menuitem" tabindex="-1" id="menu-item-1"
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreydark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                          {t("navbar.profile")}</p>
                      </Link>
                    </RadixLink>
                    {userObject && userObject.userType === 'creator' &&
                      <>
                        <RadixLink>
                          <Link
                            to='/upload-demo' role="menuitem" tabindex="-1" id="menu-item-1"
                            className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                            <svg
                              className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreydark"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                              <path
                                d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                            </svg>
                            <p
                              className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                              {t("navbar.upload_demo")}</p>
                          </Link>
                        </RadixLink>
                        <RadixLink>
                          <Link
                            to='/upload-event' role="menuitem" tabindex="-1" id="menu-item-1"
                            className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                            <svg
                              className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreydark"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                              <path
                                d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                            </svg>
                            <p
                              className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                              {t("navbar.upload_event")}</p>
                          </Link>
                        </RadixLink>
                      </>}
                    <RadixLink>
                      <Link
                        to='/favourites' role="menuitem" tabindex="-1" id="menu-item-1"
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreydark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                          {t("navbar.favourites")}</p>
                      </Link>
                    </RadixLink>
                    <RadixLink>
                      <a
                        onClick={signOutUser} role="menuitem" tabindex="-1" id="menu-item-1"
                        className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit cursor-pointer select-none group/anchor">
                        <svg
                          className="group-hover/anchor:fill-nbgreenmain group-active/anchor:fill-nbgreenlight group-disabled/anchor:fill-nbgreenlight h-3 transition-all translate-y-1 fill-nbgreydark"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13" fill="none">
                          <path
                            d="M9.53333 6.5L12 4.03333L8.48 0.5L5.98667 2.95333L3.53333 0.5L0 4.06L2.44 6.5L0 8.94L3.53333 12.5L5.98667 10.0467L8.44 12.5L12 9L9.53333 6.5Z" />
                        </svg>
                        <p
                          className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                          {t("navbar.logout")}</p>
                      </a>
                    </RadixLink>
                    <div className='inline-flex items-baseline justify-between gap-0.5 w-full'>
                    {i18n.language === 'hu' && (
                        <button onClick={() => changeLanguage("en")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            hu</p>
                        </button>
                      )}
                      {i18n.language === 'en' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("fr")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            en</p>
                        </button>
                      )}
                      {i18n.language === 'fr' && (
                        <button onClick={() => changeLanguage("it")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            fr</p>
                        </button>
                      )}
                      {i18n.language === 'it' && (
                        <button onClick={() => changeLanguage("de")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            it</p>
                        </button>
                      )}
                      {i18n.language === 'de' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("bg")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            de</p>
                        </button>
                      )}
                      {i18n.language === 'bg' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("tr")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            bg</p>
                        </button>
                      )}
                      {i18n.language === 'tr' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("Ω")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            tr</p>
                        </button>
                      )}
                      {i18n.language === 'Ω' && (
                        //<p className='font-a-anchor font-semibold text-base text-nbgreymain leading-5 tracking-tight'>|</p>
                        <button onClick={() => changeLanguage("hu")} className="flex items-start gap-1 -mb-0.5 min-w-fit min-h-fit select-none group/anchor">
                          <p
                            className="group-hover/anchor:text-nbgreenmain group-active/anchor:text-nbgreenlight group-disabled/anchor:text-nbgreymain min-w-max font-a-anchor font-semibold text-base text-nbgreydark leading-5 tracking-tight transition-all">
                            Ω</p>
                        </button>
                      )}
                      {/* <h5 className="font-h3-subtitle font-normal text-nbgreydark text-xs italic select-none pointer-events-none">{betaVersion}</h5> */}
                    </div>
                  </ul>
                </div>
              </Content>
            </Item>
          )}
        </ul>
      </Root>
    </header >
  );
};

export default Header;
