import groq from 'groq';

export const portfolioContentQuery = groq`
	{
		"portfolioContent": *[_type == "portfolioContent" && _id in ["drafts.portfolioContent", "portfolioContent"]]
			| order(_id desc)[0]{
				external_links,
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
							responsibilities
						}, [])
					}
				}
			},
		"workEducationContent": *[_type == "workEducationContent"]
			| order(_updatedAt desc)[0]{
				title,
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
