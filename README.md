# react-app-manager
Quickly builds a react app with routes by defining pages and page sections as a series of interwoven mini React apps.

You essentially create a mini App as a component and then render it as a page that would run at a given path. You also have the option to define it as an element which can also be rendered at whichever path you'd want which could allow an element to appear on multiple pages.

The intended usage is outlined in the `react-app-manager/scripts/main.js` file and is also copied below

>
	import WebApp from './apps/WebApp/index.js'
	import React, { Component } from 'react'

	import { Link } from 'react-router'

	import DefaultPageApp from './apps/DefaultPageApp/components/DefaultPageApp'

	class DemoApp extends Component {
		render(){
			return(
				<div>
					<p>Demo App</p>
				</div>
			)
		}
	}

	class BannerApp extends Component {
		render(){
			return(
				<div>
					<p>BannerApp</p>
				</div>
			)
		}
	}

	class SampleApp extends Component {
		render(){
			return(
				<div>
					<p>SampleApp</p>
				</div>
			)
		}
	}

	class TestingApp extends Component {
		render(){
			return(
				<div>
					<p>TestingApp, this is only on sample-page URLs</p>
					<ul>
						<li>
							<Link to={'/sample-page/test1'}>
								test1
							</Link>
						</li>
						<li>
							<Link to={'/sample-page/test2'}>
								test2
							</Link>
						</li>
						<li>
							<Link to={'/sample-page/test3'}>
								test3
							</Link>
						</li>
						<li>
							<Link to={'/sample-page/test4'}>
								test4
							</Link>
						</li>
					</ul>
				</div>
			)
		}
	}


	const web_app = new WebApp({
		document_element: document.getElementById('web_app'),
		typekit_kitId: null,
		api_root_url: '//some_remote_resource/api/',
		page_types: {
			'sample-page': {
				animate_subpages: false,
				isIndexRoute: true,
				component: DemoApp,
				paths: ['sample-page', 'sample-page/:postID'],
				models: [
					{
						name: 'Media',
						api_path: '/media',
						full_set: false
					}
				],
				subpages: function(){
					return [];
				}
			},
			default: {
				animate_subpages: false,
				component: DefaultPageApp,
				paths: '*',
				models: [
					{
						name: 'Media',
						api_path: '/media',
						full_set: false
					},
					{
						name: 'Tests',
						api_path: '/tests',
						full_set: true
					}
				],
				subpages: function(){
					return [];
				}
			}
		},
		elements: {
			page_banner: {
				component: BannerApp,
				paths: {
					'*': {}
				},
				models: [
					{
						name: 'Sample People',
						api_path: '/sample-people',
						full_set: false
					},
					{
						name: 'Media',
						api_path: '/media',
						full_set: false
					}
				]
			},
			page_banner2: {
				component: SampleApp,
				paths: {
					'*': {},
					'sample-page/:postID': {}
				},
				models: [
					{
						name: 'Sample People',
						api_path: '/sample-people',
						full_set: false
					},
					{
						name: 'Media',
						api_path: '/media',
						full_set: false
					}
				]
			},
			demo_item: {
				component: TestingApp,
				paths: {
					'sample-page': {},
					'sample-page/:postID': {},
					'home': {}
				},
				models: [
					{
						name: 'Sample People',
						api_path: '/sample-people',
						full_set: false
					},
					{
						name: 'Media',
						api_path: '/media',
						full_set: false
					}
				]
			}
		}
	});
