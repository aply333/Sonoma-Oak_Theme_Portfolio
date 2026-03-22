import groq from 'groq';

export const portfolioContentQuery = groq`
	{
		"portfolioContent": *[_type == "portfolioContent" && _id in ["drafts.portfolioContent", "portfolioContent"]]
			| order(_id desc)[0]{
				hero,
				about{
					title,
					links,
					paragraphs,
					highlights{
						"languages": coalesce(languages[]->{
							_id,
							title,
							category
						}, []),
						"frameworks": coalesce(frameworks[]->{
							_id,
							title,
							category
						}, []),
						"tools": coalesce(tools[]->{
							_id,
							title,
							category
						}, []),
						"professionalSkills": coalesce(professionalSkills[]->{
							_id,
							title,
							category
						}, [])
					}
				},
				galleryContent{
					projectGallery{
						title,
						intro,
						"clientEntries": coalesce(clientEntries[]->{
							_id,
							title,
							type,
							description,
							details,
							link,
							"relatedArticleSlug": relatedArticle->slug.current,
							skills[]->{
								title,
								category
							},
							category->{
								title
							}
						}, []),
						"personalEntries": coalesce(personalEntries[]->{
							_id,
							title,
							type,
							description,
							details,
							link,
							"relatedArticleSlug": relatedArticle->slug.current,
							skills[]->{
								title,
								category
							},
							category->{
								title
							}
						}, [])
					},
					hobbyGallery{
						title,
						intro,
						"featuredEntries": coalesce(featuredEntries[]->{
							_id,
							title,
							description,
							responsibilities,
							"relatedArticleSlug": relatedArticle->slug.current,
							tags[]->{
								title,
								color
							}
						}, [])
					},
					dataGallery{
						title,
						intro,
						"featuredEntries": coalesce(featuredEntries[]->{
							_id,
							title,
							description,
							responsibilities,
							"relatedArticleSlug": relatedArticle->slug.current
						}, [])
					}
				}
			},
		"workEducationContent": *[_type == "workEducationContent"]
			| order(_updatedAt desc)[0]{
				workTitle,
				"workEntries": coalesce(workEntries[]->{
					_id,
					title,
					timeRange,
					role,
					description,
					responsibilities,
					linkLabel,
					linkHref
				}, []),
				educationTitle,
				"educationEntries": coalesce(educationEntries[]->{
					_id,
					title,
					timeRange,
					role,
					description,
					responsibilities,
					linkLabel,
					linkHref
				}, []),
				reflectionTitle,
				reflectionBody
			}
	}
`;

export const blogRootQuery = groq`
	{
		"blogContent": *[_type == "blogContent" && _id in ["drafts.blogContent", "blogContent"]]
			| order(_id desc)[0]{
				title,
				intro,
				"featuredArticle": featuredArticle->{
					_type,
					title,
					"slug": slug.current,
					"publishedAt": coalesce(intro.publishedAt, _createdAt),
					"excerpt": intro.excerpt,
					"skills": select(
						_type == "projectBlog" => coalesce(finalSection.projects[0]->skills[]->title, []),
						[]
					),
					"tags": select(
						_type == "hobbyBlog" => coalesce(finalSection.hobbies[0]->tags[]->{
							title,
							color
						}, []),
						[]
					)
				}
			},
		"projectPosts": *[_type == "projectBlog"] | order(intro.publishedAt desc){
			_id,
			title,
			"slug": slug.current,
			"publishedAt": coalesce(intro.publishedAt, _createdAt),
			"excerpt": intro.excerpt,
			"skills": coalesce(finalSection.projects[0]->skills[]->title, [])
		},
		"dataPosts": *[_type == "dataBlog"] | order(intro.publishedAt desc){
			_id,
			title,
			"slug": slug.current,
			"publishedAt": coalesce(intro.publishedAt, _createdAt),
			"excerpt": intro.excerpt,
			"skills": []
		},
		"hobbyPosts": *[_type == "hobbyBlog"] | order(intro.publishedAt desc){
			_id,
			title,
			"slug": slug.current,
			"publishedAt": coalesce(intro.publishedAt, _createdAt),
			"excerpt": intro.excerpt,
			"tags": coalesce(finalSection.hobbies[0]->tags[]->{
				title,
				color
			}, [])
		}
	}
`;

export const projectBlogPageQuery = groq`
	{
		"pageContent": *[_type == "projectBlogContent" && _id in ["drafts.projectBlogContent", "projectBlogContent"]]
			| order(_id desc)[0]{
				title,
				intro,
				"featuredArticle": featuredArticle->{
					title,
					"publishedAt": coalesce(intro.publishedAt, _createdAt),
					"excerpt": intro.excerpt,
					"skills": coalesce(finalSection.projects[0]->skills[]->title, [])
				}
			},
		"posts": *[_type == "projectBlog"] | order(coalesce(intro.publishedAt, _createdAt) desc){
			_id,
			title,
			"slug": slug.current,
			"publishedAt": coalesce(intro.publishedAt, _createdAt),
			"excerpt": intro.excerpt,
			"skills": coalesce(finalSection.projects[0]->skills[]->title, [])
		}
	}
`;

export const dataBlogPageQuery = groq`
	{
		"pageContent": *[_type == "dataBlogContent" && _id in ["drafts.dataBlogContent", "dataBlogContent"]]
			| order(_id desc)[0]{
				title,
				intro,
				"featuredArticle": featuredArticle->{
					title,
					"publishedAt": coalesce(intro.publishedAt, _createdAt),
					"excerpt": intro.excerpt,
					"skills": []
				}
			},
		"posts": *[_type == "dataBlog"] | order(coalesce(intro.publishedAt, _createdAt) desc){
			_id,
			title,
			"slug": slug.current,
			"publishedAt": coalesce(intro.publishedAt, _createdAt),
			"excerpt": intro.excerpt,
			"skills": []
		}
	}
`;

export const hobbyBlogPageQuery = groq`
	{
		"pageContent": *[_type == "hobbyBlogContent" && _id in ["drafts.hobbyBlogContent", "hobbyBlogContent"]]
			| order(_id desc)[0]{
				title,
				intro,
				"featuredArticle": featuredArticle->{
					title,
					"publishedAt": coalesce(intro.publishedAt, _createdAt),
					"excerpt": intro.excerpt,
					"tags": coalesce(finalSection.hobbies[0]->tags[]->{
						title,
						color
					}, [])
				}
			},
		"posts": *[_type == "hobbyBlog"] | order(coalesce(intro.publishedAt, _createdAt) desc){
			_id,
			title,
			"slug": slug.current,
			"publishedAt": coalesce(intro.publishedAt, _createdAt),
			"excerpt": intro.excerpt,
			"tags": coalesce(finalSection.hobbies[0]->tags[]->{
				title,
				color
			}, [])
		}
	}
`;

export const projectBlogArticleSlugsQuery = groq`
	*[_type == "projectBlog" && defined(slug.current)]{
		"slug": slug.current
	}
`;

export const dataBlogArticleSlugsQuery = groq`
	*[_type == "dataBlog" && defined(slug.current)]{
		"slug": slug.current
	}
`;

export const hobbyBlogArticleSlugsQuery = groq`
	*[_type == "hobbyBlog" && defined(slug.current)]{
		"slug": slug.current
	}
`;

export const projectBlogArticleQuery = groq`
	*[_type == "projectBlog" && slug.current == $slug][0]{
		_id,
		title,
		"slug": slug.current,
		"publishedAt": coalesce(intro.publishedAt, _createdAt),
		"excerpt": intro.excerpt,
		"featuredImage": intro.featuredImage{
			alt,
			caption,
			placementX,
			placementY,
			"url": asset->url,
			"asset": asset->{
				url
			}
		},
		"body": body[]{
			...,
			_type == "image" => {
				...,
				"url": asset->url,
				"asset": asset->{
					url
				}
			}
		},
		"stack": coalesce(finalSection.projects[0]->skills[]->title, []),
		"relatedArticles": coalesce(finalSection.relatedArticles[]->{
			_id,
			title,
			"slug": slug.current
		}, []),
		"relatedEntries": coalesce(finalSection.projects[]->{
			_id,
			title,
			"relatedArticleSlug": relatedArticle->slug.current
		}, []),
		"relatedSkills": coalesce(finalSection.skills[]->{
			title,
			category
		}, []),
		"footerContent": finalSection.footerContent
	}
`;

export const dataBlogArticleQuery = groq`
	*[_type == "dataBlog" && slug.current == $slug][0]{
		_id,
		title,
		"slug": slug.current,
		"publishedAt": coalesce(intro.publishedAt, _createdAt),
		"excerpt": intro.excerpt,
		"featuredImage": intro.featuredImage{
			alt,
			caption,
			placementX,
			placementY,
			"url": asset->url,
			"asset": asset->{
				url
			}
		},
		"body": body[]{
			...,
			_type == "image" => {
				...,
				"url": asset->url,
				"asset": asset->{
					url
				}
			}
		},
		"stack": [],
		"relatedArticles": coalesce(finalSection.relatedArticles[]->{
			_id,
			title,
			"slug": slug.current
		}, []),
		"relatedEntries": coalesce(finalSection.dataEntries[]->{
			_id,
			title,
			"relatedArticleSlug": relatedArticle->slug.current
		}, []),
		"relatedSkills": coalesce(finalSection.skills[]->{
			title,
			category
		}, []),
		"footerContent": finalSection.footerContent
	}
`;

export const hobbyBlogArticleQuery = groq`
	*[_type == "hobbyBlog" && slug.current == $slug][0]{
		_id,
		title,
		"slug": slug.current,
		"publishedAt": coalesce(intro.publishedAt, _createdAt),
		"excerpt": intro.excerpt,
		"featuredImage": intro.featuredImage{
			alt,
			caption,
			placementX,
			placementY,
			"url": asset->url,
			"asset": asset->{
				url
			}
		},
		"body": body[]{
			...,
			_type == "image" => {
				...,
				"url": asset->url,
				"asset": asset->{
					url
				}
			}
		},
		"tags": coalesce(finalSection.hobbies[0]->tags[]->{
			title,
			color
		}, []),
		"relatedArticles": coalesce(finalSection.relatedArticles[]->{
			_id,
			title,
			"slug": slug.current
		}, []),
		"relatedEntries": coalesce(finalSection.hobbies[]->{
			_id,
			title,
			"relatedArticleSlug": relatedArticle->slug.current
		}, []),
		"relatedTags": coalesce(finalSection.tags[]->{
			title,
			color
		}, []),
		"footerContent": finalSection.footerContent
	}
`;
