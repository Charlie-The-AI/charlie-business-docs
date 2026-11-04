import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { DocPageData } from '../docsTypes';
import { ApiTable } from '../../components/docs/ApiTable';
import { Callout } from '../../components/docs/Callout';
import { CodeBlock } from '../../components/docs/CodeBlock';
import { ExampleResponse } from '../../components/docs/ExampleResponse';

export const DATASETS_AND_ADAPTERS_PAGES: DocPageData[] = [
  {
    slug: 'datasets/orders',
    href: '/docs/datasets/orders',
    title: 'CharlieOrder Dataset',
    description:
      'Understand how Charlie represents customer purchases, order statuses, line items, and monetary values.',
    group: 'Datasets',
    headings: [
      { id: 'what-is-an-order', title: 'What Is a CharlieOrder?' },
      { id: 'schema-fields', title: 'Required & Optional Fields' },
      { id: 'order-statuses', title: 'Order Status Handling' },
      { id: 'sample-order', title: 'Sample Input & Normalized Output' },
      { id: 'common-errors', title: 'Common Pitfalls' },
    ],
    searchKeywords: [
      'CharlieOrder',
      'orders',
      'dataset',
      'totalMinor',
      'status',
      'paid',
      'refunded',
    ],
    markdownSummary: `# CharlieOrder Dataset\n\nRepresents a single transaction with \`id\`, \`customerId\`, \`totalMinor\`, \`currency\`, \`status\`, and \`createdAt\`.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="what-is-an-order" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            What Is a CharlieOrder?
          </h2>
          <p>
            A <code className="font-mono text-xs">CharlieOrder</code> is Charlie&apos;s
            standard TypeScript shape for a completed or attempted purchase. It works
            equally well for e-commerce carts, SaaS invoice payments, paid appointments,
            or B2B wholesale orders.
          </p>
        </section>

        <section id="schema-fields" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Required &amp; Optional Fields
          </h2>
          <ApiTable
            rows={[
              {
                property: 'id',
                type: 'string',
                required: true,
                description: 'Unique identifier for the order (e.g., "ord_9012" or UUID).',
              },
              {
                property: 'customerId',
                type: 'string',
                required: true,
                description:
                  'Identifier linking this purchase to a buyer for RFM and repeat-rate analysis.',
              },
              {
                property: 'totalMinor',
                type: 'number',
                required: true,
                description:
                  'Integer order total in minor currency units (e.g., 4900 for $49.00 USD).',
              },
              {
                property: 'currency',
                type: 'string',
                required: true,
                description: 'Three-letter ISO 4217 currency code such as "USD", "EUR", or "NGN".',
              },
              {
                property: 'status',
                type: "'paid' | 'pending' | 'refunded' | 'cancelled'",
                required: true,
                description:
                  'Determines whether the order counts toward net recognized revenue.',
              },
              {
                property: 'createdAt',
                type: 'string (ISO 8601)',
                required: true,
                description: 'Timestamp when the order was placed, used for trends and recency.',
              },
              {
                property: 'refundedMinor',
                type: 'number',
                required: false,
                defaultValue: '0',
                description: 'Optional partial refund amount in minor units.',
              },
              {
                property: 'items',
                type: 'CharlieOrderItem[]',
                required: false,
                defaultValue: '[]',
                description:
                  'Optional line items ({ productId, name, quantity, unitPriceMinor }) for product Pareto analysis.',
              },
            ]}
          />
        </section>

        <section id="order-statuses" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Order Status Handling
          </h2>
          <p>
            By default, Charlie includes <code className="font-mono text-xs">'paid'</code>{' '}
            orders in net revenue, subtracts <code className="font-mono text-xs">refundedMinor</code>,
            and excludes <code className="font-mono text-xs">'pending'</code> or{' '}
            <code className="font-mono text-xs">'cancelled'</code> orders from revenue
            totals while still reporting conversion and cancellation ratios.
          </p>
        </section>

        <section id="sample-order" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Sample Input &amp; Normalized Output
          </h2>
          <CodeBlock
            language="typescript"
            filename="sample-orders.ts"
            illustrativeLabel="Illustrative SDK Example"
            code={`const order: CharlieOrder = {
  id: 'ord_2048',
  customerId: 'cus_77',
  totalMinor: 14900,
  currency: 'USD',
  status: 'paid',
  createdAt: '2026-10-28T14:20:00Z',
  items: [
    { productId: 'sku_pro', name: 'Annual Pro Plan', quantity: 1, unitPriceMinor: 14900 }
  ],
};`}
          />
        </section>

        <section id="common-errors" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Common Pitfalls
          </h2>
          <Callout variant="warning" title="Avoid mixing currencies or major/minor units">
            Do not pass <code className="font-mono text-xs">75.50</code> into{' '}
            <code className="font-mono text-xs">totalMinor</code>—always multiply decimal
            major units by 100 and round (<code className="font-mono text-xs">Math.round(amount * 100)</code>).
            If your store accepts multiple currencies, group orders by currency before
            running single-currency revenue aggregations.
          </Callout>
        </section>
      </div>
    ),
  },
  {
    slug: 'datasets/customers',
    href: '/docs/datasets/customers',
    title: 'CharlieCustomer Dataset',
    description:
      'Structure customer records, connect buyers to orders, and keep personally identifiable information private.',
    group: 'Datasets',
    headings: [
      { id: 'what-is-a-customer', title: 'What Is a CharlieCustomer?' },
      { id: 'customer-fields', title: 'Schema Reference' },
      { id: 'connecting-orders', title: 'How Orders Connect to Customers' },
      { id: 'privacy-considerations', title: 'Privacy Considerations' },
    ],
    searchKeywords: [
      'CharlieCustomer',
      'customers',
      'privacy',
      'PII',
      'customerId',
      'cohort',
    ],
    markdownSummary: `# CharlieCustomer Dataset\n\nRepresents a customer with a required \`id\` and optional display metadata. PII is never required for analytics or AI calls.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="what-is-a-customer" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            What Is a CharlieCustomer?
          </h2>
          <p>
            A <code className="font-mono text-xs">CharlieCustomer</code> represents an
            individual shopper, client account, or organization that places orders. Even
            if you only pass orders, Charlie can infer customer cohorts from{' '}
            <code className="font-mono text-xs">order.customerId</code>—providing{' '}
            <code className="font-mono text-xs">CharlieCustomer</code> records enriches
            cohorts with signup dates (for acquisition cohorts) and human-readable labels.
          </p>
        </section>

        <section id="customer-fields" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Schema Reference
          </h2>
          <ApiTable
            rows={[
              {
                property: 'id',
                type: 'string',
                required: true,
                description:
                  'Unique customer ID matching order.customerId (e.g., "cus_25").',
              },
              {
                property: 'createdAt',
                type: 'string (ISO 8601)',
                required: false,
                description: 'When the customer account was first created.',
              },
              {
                property: 'displayName',
                type: 'string',
                required: false,
                description:
                  'Optional display label for internal admin tables (never sent to external LLMs by default).',
              },
              {
                property: 'segmentTag',
                type: 'string',
                required: false,
                description:
                  'Optional business tag such as "wholesale", "self-serve", or "enterprise".',
              },
            ]}
          />
        </section>

        <section id="connecting-orders" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            How Orders Connect to Customers
          </h2>
          <ExampleResponse
            title="Customer Cohort Enrichment"
            json={`{
  "customerId": "cus_25",
  "displayName": "Northwind Studio",
  "lifetimeOrders": 6,
  "lifetimeSpendMinor": 284000,
  "lastOrderAt": "2026-10-30T11:12:00Z",
  "rfmSegment": "Champions"
}`}
            explanations={[
              {
                field: 'customerId',
                meaning: 'Joined deterministically against every CharlieOrder with customerId "cus_25".',
              },
              {
                field: 'rfmSegment',
                meaning: 'Assigned cohort based on recency, order count, and cumulative spend.',
              },
            ]}
          />
        </section>

        <section id="privacy-considerations" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Privacy Considerations
          </h2>
          <Callout variant="tip" title="Keep PII out of analytics payloads">
            Charlie does not require customer email addresses, phone numbers, or billing
            addresses. Use opaque internal IDs (<code className="font-mono text-xs">cus_25</code>)
            when running analytics, and join emails back in your own application layer
            only if your team triggers an outreach workflow.
          </Callout>
        </section>
      </div>
    ),
  },
  {
    slug: 'datasets/coming-soon',
    href: '/docs/datasets/coming-soon',
    title: 'Upcoming Datasets',
    description:
      'Planned domain datasets on the Charlie open-source roadmap. These interfaces are not yet implemented in the current package.',
    group: 'Datasets',
    comingSoon: true,
    headings: [
      { id: 'roadmap-datasets', title: 'Planned Datasets (Coming Soon)' },
      { id: 'what-to-use-today', title: 'What to Use Today' },
    ],
    searchKeywords: [
      'coming soon',
      'roadmap',
      'CharlieProduct',
      'CharliePayment',
      'CharlieBooking',
      'CharlieExpense',
      'CharlieSubscription',
    ],
    markdownSummary: `# Upcoming Datasets (Coming Soon)\n\nPlanned datasets: CharlieProduct, CharliePayment, CharlieBooking, CharlieExpense, CharlieSubscription.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <Callout variant="note" title="Roadmap transparency">
          The datasets listed on this page are currently in design and are{' '}
          <strong>not yet available</strong> in <code className="font-mono text-xs">charlie-the-business-advisor</code>.
          Today, use <code className="font-mono text-xs">CharlieOrder</code> (with optional{' '}
          <code className="font-mono text-xs">items</code>) and{' '}
          <code className="font-mono text-xs">CharlieCustomer</code>.
        </Callout>

        <section id="roadmap-datasets" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Planned Datasets (Coming Soon)
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                name: 'CharlieProduct',
                summary:
                  'Dedicated catalog SKU metadata, unit cost of goods sold (COGS), gross margin analysis, and inventory velocity.',
              },
              {
                name: 'CharliePayment',
                summary:
                  'Gateway settlement records, processing fee deductions, failed charge retry recovery, and payout reconciliation.',
              },
              {
                name: 'CharlieBooking',
                summary:
                  'Appointment and reservation analytics including slot utilization, no-show rates, and lead-time patterns.',
              },
              {
                name: 'CharlieExpense',
                summary:
                  'Operating cost categorization, vendor spend concentration, and net operating margin snapshots.',
              },
              {
                name: 'CharlieSubscription',
                summary:
                  'Recurring SaaS metrics including MRR, ARR, logo churn, net dollar retention, and plan upgrades/downgrades.',
              },
            ].map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-[#27272A] dark:bg-[#111114]"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                    <Clock className="h-3 w-3" />
                    Coming Soon
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="what-to-use-today" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            What to Use Today
          </h2>
          <p>
            If your application sells subscriptions or bookings today, you can already
            map each paid invoice or confirmed reservation into a{' '}
            <code className="font-mono text-xs">CharlieOrder</code> using a Data Adapter
            to analyze revenue, trends, Pareto concentration, and customer RFM segments.
          </p>
        </section>
      </div>
    ),
  },
  {
    slug: 'adapters/overview',
    href: '/docs/adapters/overview',
    title: 'Use Charlie with Your Existing Database',
    description:
      'You do not need to rename your database tables or change your existing application. Tell Charlie which fields represent orders, customers, and amounts.',
    group: 'Adapters',
    headings: [
      { id: 'why-adapters-exist', title: 'Why Adapters Exist' },
      { id: 'visual-comparison', title: 'Side-by-Side Comparison' },
      { id: 'how-conversion-works', title: 'How the Conversion Works' },
      { id: 'first-adapter-code', title: 'Write Your First Adapter' },
      { id: 'batch-normalization', title: 'Batch Processing & Error Isolation' },
      { id: 'laravel-adapter', title: 'Laravel Eloquent Adapter Preset' },
      { id: 'status-normalization', title: 'Status Normalization Rules' },
    ],
    searchKeywords: [
      'adapters',
      'existing database',
      'order_no',
      'amount_paid',
      'buyer_id',
      'schema mapping',
      'normalizeBatch',
      'createLaravelOrderAdapter',
      'status mapping',
    ],
    markdownSummary: `# Use Charlie with Your Existing Database\n\nYou don't need to rename your database tables or change your existing application. Charlie adapters translate your custom fields into Charlie's standard format with batch normalization and error isolation.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="why-adapters-exist" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Why Adapters Exist
          </h2>
          <p>
            You don&apos;t need to rename your database tables or change your existing
            application. Charlie can understand your data when you tell it which fields
            represent orders, customers, and amounts.
          </p>
        </section>

        <section id="visual-comparison" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Side-by-Side Comparison
          </h2>
          <p>
            Suppose your existing application stores orders with columns named{' '}
            <code className="font-mono text-xs">order_no</code>,{' '}
            <code className="font-mono text-xs">amount_paid</code> (in whole dollars or
            naira), and <code className="font-mono text-xs">buyer_id</code>:
          </p>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-11 lg:items-center">
            <div className="lg:col-span-5">
              <p className="mb-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                Your Database Row
              </p>
              <CodeBlock
                language="json"
                filename="your-database.json"
                code={`{
  "order_no": "1001",
  "amount_paid": 7500,
  "buyer_id": 25
}`}
              />
            </div>

            <div
              aria-hidden="true"
              className="flex items-center justify-center py-1 text-emerald-600 dark:text-emerald-400 lg:col-span-1 lg:pt-6"
            >
              <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
            </div>

            <div className="lg:col-span-5">
              <p className="mb-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Charlie&apos;s Standard Format
              </p>
              <CodeBlock
                language="json"
                filename="charlie-order.json"
                code={`{
  "id": "1001",
  "totalMinor": 750000,
  "customerId": "25"
}`}
              />
            </div>
          </div>
        </section>

        <section id="how-conversion-works" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            How the Conversion Works
          </h2>
          <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-[#27272A]">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-[#27272A] dark:bg-[#111114]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">
                    Your Field
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">
                    Charlie Field
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">
                    What Happens During Mapping
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white dark:divide-[#27272A] dark:bg-[#09090B]">
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-700 dark:text-zinc-300">
                    order_no: &quot;1001&quot;
                  </td>
                  <td className="px-4 py-3 font-mono text-emerald-700 dark:text-emerald-400">
                    id: &quot;1001&quot;
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    Copied directly as the unique order identifier.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-700 dark:text-zinc-300">
                    amount_paid: 7500
                  </td>
                  <td className="px-4 py-3 font-mono text-emerald-700 dark:text-emerald-400">
                    totalMinor: 750000
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    Multiplied by 100 to convert major currency units into exact minor units.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-700 dark:text-zinc-300">
                    buyer_id: 25
                  </td>
                  <td className="px-4 py-3 font-mono text-emerald-700 dark:text-emerald-400">
                    customerId: &quot;25&quot;
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    Converted from numeric database ID <code className="font-mono">25</code> into string <code className="font-mono">&quot;25&quot;</code>.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="first-adapter-code" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Write Your First Adapter
          </h2>
          <CodeBlock
            language="typescript"
            filename="adapter-example.ts"
            showLineNumbers
            illustrativeLabel="Illustrative SDK Example"
            code={`import { createOrderAdapter } from 'charlie-the-business-advisor';

const adaptOrders = createOrderAdapter({
  id: (row: { order_no: string }) => row.order_no,
  totalMinor: (row: { amount_paid: number }) => Math.round(row.amount_paid * 100),
  customerId: (row: { buyer_id: number }) => String(row.buyer_id),
  currency: () => 'USD',
  status: () => 'paid',
  createdAt: (row: { created_at?: string }) => row.created_at ?? new Date().toISOString(),
});`}
          />
        </section>

        <section id="batch-normalization" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Batch Processing &amp; Error Isolation
          </h2>
          <p>
            When syncing thousands of orders from SQL queries or CSV imports, a single corrupt
            row should never bring down your entire analytics pipeline. Adapters provide{' '}
            <code className="font-mono text-xs">adapter.normalizeBatch(rows)</code> with automatic
            error isolation and duplicate protection:
          </p>
          <CodeBlock
            language="typescript"
            filename="batch-sync.ts"
            showLineNumbers
            illustrativeLabel="Batch Normalization Example"
            code={`import { createOrderAdapter } from 'charlie-the-business-advisor';

const adapter = createOrderAdapter<RawDatabaseRow>({
  id: 'order_uuid',
  customerId: 'account_id',
  totalMajorUnits: 'charged_amount', // Converted to integer cents automatically
  status: 'status_code',
  currency: () => 'USD',
  createdAt: 'created_time',
});

// Normalize an array of database rows safely:
const batch = adapter.normalizeBatch(rawDbRows);

console.log(\`Total records processed: \${batch.totalProcessed}\`);
console.log(\`Successfully valid: \${batch.orders.length}\`);
console.log(\`Validation failures: \${batch.errors.length}\`);
console.log(\`Duplicates skipped: \${batch.duplicateCount}\`);

// batch.orders is now ready to pass directly to charlie.analyze({ orders: batch.orders })`}
          />
          <Callout variant="tip" title="Duplicate ID Protection">
            <code className="font-mono text-xs">normalizeBatch</code> tracks seen order IDs in an
            internal set during processing. If identical order IDs appear multiple times in the source array,
            subsequent occurrences are safely skipped to prevent double-counting revenue in Pareto and trends.
          </Callout>
        </section>

        <section id="laravel-adapter" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Laravel Eloquent Adapter Preset
          </h2>
          <p>
            Building a Laravel backend with PHP? You can use Charlie&apos;s pre-configured
            Laravel Eloquent order adapter. It natively understands typical Eloquent relations
            such as <code className="font-mono text-xs">customer.id</code>,{' '}
            <code className="font-mono text-xs">order_items</code>, and major-unit decimals:
          </p>
          <CodeBlock
            language="typescript"
            filename="laravel-adapter.ts"
            showLineNumbers
            code={`import { createLaravelOrderAdapter } from 'charlie-the-business-advisor';
// or: import { createLaravelOrderAdapter } from '@charlie-the-ai/analytics-adapters';

const laravelAdapter = createLaravelOrderAdapter('NGN');

const rawLaravelOrders = [
  {
    id: 1045,
    vendor_id: 12,
    customer: { id: 55, name: 'Amina Bello', email: 'amina@example.com' },
    status: 'paid', // Intelligently mapped to canonical 'completed'
    currency: 'NGN',
    total_amount: 45000.00, // Converted to 4,500,000 kobo
    created_at: '2026-03-20 14:32:00',
    order_items: [
      {
        id: 301,
        product_id: 88,
        product_name: 'Artisan Leather Bag',
        quantity: 1,
        price: 45000.00,
      },
    ],
  },
];

const { orders, errors } = laravelAdapter.normalizeBatch(rawLaravelOrders);
console.log('Normalized Order:', orders[0]);`}
          />
        </section>

        <section id="status-normalization" className="scroll-mt-24 space-y-4">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Status Normalization Rules
          </h2>
          <p>
            Different platforms use different terminology for transaction states. Charlie&apos;s
            adapters automatically map source statuses to 5 canonical states:
          </p>
          <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-[#27272A]">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-[#27272A] dark:bg-[#111114]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">
                    Raw Status Input
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">
                    Canonical Charlie Status
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">
                    Recognized in Net Revenue?
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white dark:divide-[#27272A] dark:bg-[#09090B]">
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-700 dark:text-zinc-300">
                    completed, paid, delivered, fulfilled, success
                  </td>
                  <td className="px-4 py-3 font-mono text-emerald-700 dark:text-emerald-400">
                    completed
                  </td>
                  <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-medium">
                    Yes
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-700 dark:text-zinc-300">
                    pending, processing, unpaid, open
                  </td>
                  <td className="px-4 py-3 font-mono text-amber-700 dark:text-amber-400">
                    pending
                  </td>
                  <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">
                    No
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-700 dark:text-zinc-300">
                    refunded
                  </td>
                  <td className="px-4 py-3 font-mono text-rose-700 dark:text-rose-400">
                    refunded
                  </td>
                  <td className="px-4 py-3 text-rose-600 dark:text-rose-400 font-medium">
                    Deducted
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-700 dark:text-zinc-300">
                    cancelled, void, voided
                  </td>
                  <td className="px-4 py-3 font-mono text-zinc-500 dark:text-zinc-400">
                    cancelled
                  </td>
                  <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">
                    No
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-700 dark:text-zinc-300">
                    failed, declined
                  </td>
                  <td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">
                    failed
                  </td>
                  <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">
                    No
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    ),
  },
  {
    slug: 'adapters/field-mapping',
    href: '/docs/adapters/field-mapping',
    title: 'Declarative Field Mapping',
    description:
      'Map flat database columns or ORM models to CharlieOrder and CharlieCustomer using concise property keys.',
    group: 'Adapters',
    headings: [
      { id: 'key-based-mapping', title: 'Key-Based Property Mapping' },
      { id: 'status-dictionary', title: 'Mapping Custom Status Codes' },
    ],
    searchKeywords: ['field mapping', 'columns', 'ORM', 'prisma', 'drizzle', 'status map'],
    markdownSummary: `# Declarative Field Mapping\n\nMap column names and custom status enums cleanly into Charlie standard fields.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="key-based-mapping" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Key-Based Property Mapping
          </h2>
          <p>
            When your database already stores amounts in minor units (such as Stripe
            webhook payloads or modern fintech tables), you can map fields directly:
          </p>
          <CodeBlock
            language="typescript"
            filename="prisma-order-mapping.ts"
            illustrativeLabel="Illustrative SDK Example"
            code={`import { createOrderAdapter } from 'charlie-the-business-advisor';

// Mapping Prisma Order model rows
export const mapPrismaOrders = createOrderAdapter({
  id: (row) => row.uuid,
  customerId: (row) => row.accountId,
  totalMinor: (row) => row.amountCents,
  currency: (row) => row.isoCurrency,
  status: (row) => STATUS_LOOKUP[row.paymentState] ?? 'pending',
  createdAt: (row) => row.placedAt.toISOString(),
});`}
          />
        </section>

        <section id="status-dictionary" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Mapping Custom Status Codes
          </h2>
          <p>
            Many databases store numeric status codes (<code className="font-mono text-xs">1 = paid</code>,{' '}
            <code className="font-mono text-xs">2 = refunded</code>) or custom strings
            like <code className="font-mono text-xs">&quot;SETTLED&quot;</code>. Keep a
            small lookup object alongside your adapter so status rules remain explicit and
            unit-testable:
          </p>
          <CodeBlock
            language="typescript"
            filename="status-lookup.ts"
            code={`const STATUS_LOOKUP: Record<string, 'paid' | 'pending' | 'refunded' | 'cancelled'> = {
  SETTLED: 'paid',
  COMPLETED: 'paid',
  AWAITING_PAYMENT: 'pending',
  REVERSED: 'refunded',
  VOIDED: 'cancelled',
};`}
          />
        </section>
      </div>
    ),
  },
  {
    slug: 'adapters/custom-transformations',
    href: '/docs/adapters/custom-transformations',
    title: 'Custom Transformations',
    description:
      'Handle nested line items, tax/discount adjustments, string timestamps, and dirty legacy records safely.',
    group: 'Adapters',
    headings: [
      { id: 'discounts-and-shipping', title: 'Calculating Net Order Totals' },
      { id: 'filtering-invalid-rows', title: 'Handling Dirty or Test Records' },
    ],
    searchKeywords: [
      'custom transformations',
      'discounts',
      'taxes',
      'line items',
      'legacy data',
    ],
    markdownSummary: `# Custom Transformations\n\nNormalize discounts, line items, and legacy date strings before passing records into Charlie analytics.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="discounts-and-shipping" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Calculating Net Order Totals
          </h2>
          <p>
            If your table stores subtotal, discount, and tax in separate decimal columns,
            compute the exact minor-unit net figure inside your transformation function:
          </p>
          <CodeBlock
            language="typescript"
            filename="net-transform.ts"
            illustrativeLabel="Illustrative SDK Example"
            code={`import { createOrderAdapter } from 'charlie-the-business-advisor';

export const mapEcommerceOrders = createOrderAdapter({
  id: (r) => r.orderId,
  customerId: (r) => r.shopperId || 'guest_checkout',
  totalMinor: (r) => {
    const netMajor = Number(r.subtotal) - Number(r.discountAmount || 0);
    return Math.max(0, Math.round(netMajor * 100));
  },
  currency: (r) => r.currencyCode.toUpperCase(),
  status: (r) => (r.isPaid ? 'paid' : 'pending'),
  createdAt: (r) => new Date(r.orderTimestamp).toISOString(),
});`}
          />
        </section>

        <section id="filtering-invalid-rows" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Handling Dirty or Test Records
          </h2>
          <Callout variant="tip" title="Filter internal QA accounts first">
            Exclude internal staff test orders (such as <code className="font-mono text-xs">@yourcompany.com</code>{' '}
            or sandbox orders) in your SQL <code className="font-mono text-xs">WHERE</code>{' '}
            clause or <code className="font-mono text-xs">.filter()</code> before running
            Pareto or RFM calculations so test purchases do not skew top-customer rankings.
          </Callout>
        </section>
      </div>
    ),
  },
];
