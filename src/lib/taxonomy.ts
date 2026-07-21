const CATEGORY_LABELS: Record<string, string> = {
  technology: 'Technology',
  design: 'Design',
  business: 'Business',
  lifestyle: 'Lifestyle',
  tutorial: 'Tutorial',
}

export function categoryLabel(category: string) {
  return CATEGORY_LABELS[category] ?? category.charAt(0).toUpperCase() + category.slice(1)
}
