import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import type { NextPageWithLayout, UpdateProfileInput } from '@/types';
import type { SubmitHandler } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import DashboardLayout from '@/layouts/_dashboard';
import { Form } from '@/components/ui/forms/form';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import { ReactPhone } from '@/components/ui/forms/phone-input';
import Button from '@/components/ui/button';
import client from '@/data/client';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { useMe } from '@/data/user';
import pick from 'lodash/pick';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import Uploader from '@/components/ui/forms/uploader';
import CoverUploader from '@/components/ui/forms/uploader_cover';
import * as yup from 'yup';
import Tags from '@yaireo/tagify/dist/react.tagify';
import '@yaireo/tagify/dist/tagify.css';
import { useState, useRef, useEffect } from 'react';
import { SKILLS_SUGGESTIONS } from '@/lib/constants';

const profileValidationSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  profile: yup.object().shape({
    id: yup.string(),
    bio: yup.string(),
    contact: yup.string(),
    avatar: yup
      .object()
      .shape({
        id: yup.string(),
        thumbnail: yup.string(),
        original: yup.string(),
      })
      .optional()
      .nullable(),
    cover: yup
      .object()
      .shape({
        id: yup.string(),
        thumbnail: yup.string(),
        original: yup.string(),
      })
      .optional()
      .nullable(),
    skills: yup.string(),
    location: yup.string(),
  }),
});
const ProfilePage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const [skillTags, setSkillTags] = useState<string[]>([]);
  const tagsRef = useRef<HTMLDivElement>();

  const baseTagifySettings = {
    blacklist: [],
    maxTags: 100,
    backspace: 'edit',
    placeholder: 'Add your Keyword',
    editTags: 0,
    dropdown: {
      enabled: 0,
      classname: 'tags-look',
    },
    callbacks: {},
  };

  const handleChangeCallBack = (e: any) => {
    //const tags: string[] = e.detail.tagify.value.map((item: any) => item.value);
    //setSkillTags(tags);
  };

  const settings = {
    ...baseTagifySettings,
    whitelist: SKILLS_SUGGESTIONS,
    callbacks: {
      add: handleChangeCallBack,
      remove: handleChangeCallBack,
      blur: handleChangeCallBack,
      invalid: handleChangeCallBack,
      click: handleChangeCallBack,
      focus: handleChangeCallBack,
    },
  };

  const queryClient = useQueryClient();
  const { me } = useMe();
  const { mutate, isLoading } = useMutation(client.users.update, {
    onSuccess: () => {
      toast.success(<b>{t('text-profile-page-success-toast')}</b>, {
        className: '-mt-10 xs:mt-0',
      });
    },
    onError: (error) => {
      toast.error(<b>{t('text-profile-page-error-toast')}</b>, {
        className: '-mt-10 xs:mt-0',
      });
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS_ME);
    },
  });

  const onSubmit: SubmitHandler<UpdateProfileInput> = (data) => {
    const tags: string[] = tagsRef.current?.value.map(
      (item: any) => item.value
    );

    data.profile.skills = tags.join(',');
    mutate(data);
  };

  useEffect(() => {
    if (!me) return;

    setSkillTags(me.profile.skills.split(','));
  }, [me]);

  return (
    <motion.div
      variants={fadeInBottom()}
      className="flex min-h-full flex-grow flex-col"
    >
      <h1 className="mb-5 text-15px font-medium text-dark dark:text-light sm:mb-6">
        {t('text-profile-page-title')}
      </h1>
      <Form<UpdateProfileInput>
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: pick(me, [
            'id',
            'name',
            'profile.id',
            'profile.contact',
            'profile.bio',
            'profile.avatar',
            'profile.cover',
            'profile.location',
            'profile.skills',
          ]),
        }}
        validationSchema={profileValidationSchema}
        className="flex flex-grow flex-col"
      >
        {({ register, reset, control, formState: { errors } }) => (
          <>
            <fieldset className="mb-6 grid gap-5 pb-5 sm:grid-cols-2 md:pb-9 lg:mb-8">
              <Controller
                name="profile.avatar"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <div className="sm:col-span-2">
                    <span className="block cursor-pointer pb-2.5 font-normal text-dark/70 dark:text-light/70">
                      {t('text-profile-avatar')}
                    </span>
                    <div className="text-xs">
                      <Uploader {...rest} multiple={false} />
                    </div>
                  </div>
                )}
              />
              <Controller
                name="profile.cover"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <div className="sm:col-span-2">
                    <span className="block cursor-pointer pb-2.5 font-normal text-dark/70 dark:text-light/70">
                      {t('text-profile-cover')}
                    </span>
                    <div className="text-xs">
                      <CoverUploader {...rest} />
                    </div>
                  </div>
                )}
              />
              <Input
                label={t('text-profile-name')}
                {...register('name')}
                error={errors.name?.message}
              />
              <div>
                <span className="block cursor-pointer pb-2.5 font-normal text-dark/70 dark:text-light/70">
                  {t('text-profile-contact')}
                </span>
                <Controller
                  name="profile.contact"
                  control={control}
                  render={({ field }) => <ReactPhone country="us" {...field} />}
                />

                {errors.profile?.contact?.message && (
                  <span
                    role="alert"
                    className="block pt-2 text-xs text-warning"
                  >
                    {'contact field is required'}
                  </span>
                )}
              </div>

              <Input
                label={t('text-profile-location')}
                {...register('profile.location')}
                error={errors.profile?.location?.message}
                className="sm:col-span-2"
              />

              <div className="sm:col-span-2">
                <span className="block cursor-pointer pb-2.5 font-normal text-dark/70 dark:text-light/70">
                  {t('text-profile-skills')}
                </span>
                <Controller
                  name="profile.skills"
                  control={control}
                  render={({ field }) => (
                    <Tags
                      tagifyRef={tagsRef}
                      settings={settings}
                      value={skillTags}
                    />
                  )}
                />

                {errors.profile?.skills?.message && (
                  <span
                    role="alert"
                    className="block pt-2 text-xs text-warning"
                  >
                    {'contact field is required'}
                  </span>
                )}
              </div>

              <Textarea
                label={t('text-profile-bio')}
                {...register('profile.bio')}
                error={errors.profile?.bio?.message && 'bio field is required'}
                className="sm:col-span-2"
              />
            </fieldset>
            <div className="mt-auto flex items-center gap-4 pb-3 lg:justify-end">
              <Button
                type="reset"
                onClick={() =>
                  reset({
                    id: me?.id,
                    name: '',
                    profile: {
                      id: me?.profile?.id,
                      avatar: null,
                      cover: null,
                      bio: '',
                      contact: '',
                      location: '',
                    },
                  })
                }
                disabled={isLoading}
                variant="outline"
                className="flex-1 lg:flex-none"
              >
                {t('text-cancel')}
              </Button>
              <Button
                className="flex-1 lg:flex-none"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {t('text-save-changes')}
              </Button>
            </div>
          </>
        )}
      </Form>
    </motion.div>
  );
};

ProfilePage.authorization = true;
ProfilePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 60, // In seconds
  };
};

export default ProfilePage;
