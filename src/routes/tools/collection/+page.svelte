<script>
	import ToolCategoryPage from '$lib/assets/components/tool__components/tool_category_page.svelte';
	import content from './collection_content.json';
</script>

<ToolCategoryPage {content} ariaLabel="Collection tool links" pageClass="collection_page" />
