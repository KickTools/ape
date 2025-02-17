import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";

export default function AboutPage() {
  return (
    <section className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-12 max-w-3xl mx-auto">
      {/* Title */}
      <h1 className="text-4xl font-bold tracking-tight">About This Project</h1>

      {/* Project Overview */}
      <p className="text-xl text-gray-700 dark:text-gray-300">
        Welcome to <strong>Ape Gang Verification</strong>, a streamlined way to verify your **Twitch** and **Kick** accounts.
        This verification process helps ensure authenticity and allows users to participate in giveaways and community events.
      </p>

      {/* Creator Info */}
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-2xl"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-8 md:gap-8 p-1 items-center justify-center">
            {/* Profile Image */}
            <div className="relative col-span-6 md:col-span-4">
              <img
                src="/assets/images/pfp-ayybabz.jpg"
                alt="AyyBabz"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Creator Info */}
            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90">Created by AyyBabz</h3>
                  <p className="text-small text-foreground/80">
                    Founder of <strong>KickTools, LLC</strong>
                  </p>
                  <h1 className="text-large font-medium mt-2">
                    The #1 third-party resource for <strong>Kick</strong> streamers
                  </h1>
                </div>
              </div>

              <div className="flex flex-col mt-3 gap-1">
                <p className="text-small text-foreground/80">
                  This project was developed by <strong>AyyBabz</strong>, the founder of <strong>KickTools, LLC</strong>—the #1 third-party resource for <strong>Kick</strong> streamers. We are committed to providing tools that enhance the streaming experience for creators and viewers alike.
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>


      {/* Trainwreck Outreach */}
      <p className="text-lg text-gray-700 dark:text-gray-300">
        This project is <strong>not officially endorsed</strong> by <strong>Trainwreck</strong>... <strong>yet! </strong>
        But let's change that!
        Help us get his attention by reaching out to him on <strong>X (Twitter)</strong> and letting him know:
      </p>

      {/* Call to Action */}
      <Button
        as="a"
        href="https://x.com/trainwreckstv/"
        target="_blank"
        rel="noopener noreferrer"
        size="lg"
        radius="full"
        color="primary"
        className="font-semibold"
      >
        Tweet @Trainwreckstv
      </Button>
    </section>
  );
}
