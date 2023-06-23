import {isValidSignature, SIGNATURE_HEADER_NAME} from '@sanity/webhook'
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const secret = process.env.NEXT_PUBLIC_SANITY_WEBHOOK_SECRET;
  const signature = req.headers[SIGNATURE_HEADER_NAME].toString();
  const body = await readBody(req);

  try {
    //authenticating the webhook
    if (!isValidSignature(body, signature, secret)) return res.status(401).json({ msg: 'Invalid request!' });

    //getting payload
    const {_type, slug } = JSON.parse(body);

    const path = async() => {
      switch (_type) {
        case "hero":
          return '/'
        case "sections":
          return '/'
        case "about":
          return '/about'
        case "brands":
          return '/brands'
        case "markets":
          await res.revalidate(`/markets/${slug}`);
          return "/markets"
        case "products":
          await res.revalidate(`/products/${slug}`);
          return '/products'
        case "articles":
          await res.revalidate(`/press/${slug}`);
          return "/press"
        case "careers":
          await res.revalidate(`/careers/${slug}`);
          return "/careers"
        case "caseStudies":
          await res.revalidate(`/resources/${slug}`);
          return "/resources"
        case "downloads":
          return "/resources"
        case "locations":
          return "/contact"
        default:
          return "/";
      }
    }
    const url = await path();
    console.log("PAYLOAD TYPE: ", _type, ", PATH: ", url)
    await res.revalidate(url);
    res.status(200).json({ msg: 'pages revalidated.' });
  } catch (error) {
    console.log("ERROR: ",error)
    res.status(500).json({ err: 'Something went Wrong!' });
  }
};

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
}

async function readBody(readable: NextApiRequest) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

export default handler;