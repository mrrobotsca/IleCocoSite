type JsonLdProps = {
  data: object | object[]
  id?: string
}

/**
 * Renders a `<script type="application/ld+json">` block for structured data.
 * Server component — emits raw HTML so Google can parse the schema before
 * any JavaScript executes.
 */
export const JsonLd = ({ data, id }: JsonLdProps) => {
  const json = JSON.stringify(data)
  return (
    <script
      type="application/ld+json"
      {...(id && { id })}
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
