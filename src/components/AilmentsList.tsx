import { FC } from "hono/jsx";
import { Layout } from "./Layout";
import type { AilmentWithTherapies } from "../routes/ailments";

type AilmentsListProps = { ailments: AilmentWithTherapies[] };

export const AilmentsList: FC<AilmentsListProps> = ({ ailments }) => (
  <Layout>
    <h1>Ailments</h1>
    {ailments.map((a) => (
      <article key={a.id}>
        <header>
          <h2>{a.name}</h2>
        </header>
        <p>{a.description}</p>
        {a.therapies.length > 0 && (
          <>
            <h3>Recommended Therapies</h3>
            <ul>
              {a.therapies.map((t) => (
                <li key={t.id}>
                  <a href={`/therapies`}>{t.name}</a>
                </li>
              ))}
            </ul>
          </>
        )}
      </article>
    ))}
  </Layout>
);
